import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';

// Function to list available `.db` files in the current directory
const listDatabases = () => {
    return fs.readdirSync('./').filter(file => path.extname(file) === '.db');
};

// Initialize express app
const app = express();
let db = null; // Database connection variable

// Middleware
app.use(cors());
app.use(bodyParser.json());

// List available databases endpoint
app.get('/api/databases', (req, res) => {
    const dbFiles = listDatabases();
    res.json({ databases: dbFiles });
});

// Select a database to use (by file name)
app.post('/api/select-database', (req, res) => {
    const { database } = req.body;
    const dbFilePath = path.join('./', database);

    // Check if the selected file exists
    if (!fs.existsSync(dbFilePath)) {
        return res.status(404).json({ error: `Database file not found: ${database}` });
    }

    // Close the existing connection if any
    if (db) {
        db.close((err) => {
            if (err) {
                console.error('Error closing the previous database connection:', err);
            }
        });
    }

    // Open the new database
    db = new sqlite3.Database(dbFilePath, (err) => {
        if (err) {
            return res.status(500).json({ error: `Failed to connect to database: ${err.message}` });
        }
        console.log(`Connected to the database: ${dbFilePath}`);
        res.json({ message: `Database set to ${database}` });
    });
});

// Ensure a database is selected before performing actions
const ensureDbSelected = (req, res, next) => {
    if (!db) {
        return res.status(400).json({ error: 'No database selected. Please select a database first.' });
    }
    next();
};

// Endpoint: to fetch all tables in the selected database
app.get('/api/tables', ensureDbSelected, (req, res) => {
    db.all("SELECT name FROM sqlite_master WHERE type='table'", (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ tables: rows.map(row => row.name) });
    });
});

// Endpoint: to fetch columns of a table
app.get('/api/:table/columns', ensureDbSelected, (req, res) => {
    const { table } = req.params;

    db.all(`PRAGMA table_info(${table})`, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        // Extract column names from the result
        const columns = rows.map(row => row.name);
        res.json({ columns });
    });
});

// Endpoint: to fetch distinct values from a specified column in a table
app.get('/api/:table/distinct-values', (req, res) => {
    const { table } = req.params;
    const { column } = req.query;
  
    const query = `SELECT DISTINCT ${column} FROM ${table}`;
    db.all(query, [], (err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).send({ error: 'Failed to fetch distinct values' });
      } else {
        res.send({ values: rows.map((row) => row[column]) });
      }
    });
  });  

app.get('/api/:table/filter', ensureDbSelected, (req, res) => {
    const { table } = req.params;
    const { column, value } = req.query;

    if (!column || !value) {
        return res.status(400).json({ error: 'Column and value are required for filtering' });
    }

    const query = `SELECT * FROM ${table} WHERE ${column} = ?`;

    db.all(query, [value], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ data: rows });
    });
});

// CREATE: Add a new record to any table
app.post('/api/:table', ensureDbSelected, (req, res) => {
    const { table } = req.params;
    const data = req.body;

    const columns = Object.keys(data).join(', ');
    const placeholders = Object.keys(data).map(() => '?').join(', ');  // Use placeholders for values
    const values = Object.values(data);

    const query = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;

    db.run(query, values, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({ id: this.lastID, ...data });
    });
});

// READ: Get all records from any table
app.get('/api/:table', ensureDbSelected, (req, res) => {
    const { table } = req.params;

    db.all(`SELECT * FROM ${table}`, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ data: rows });
    });
});

// READ: Get a single record by ID from any table
app.get('/api/:table/:id', ensureDbSelected, (req, res) => {
    const { table, id } = req.params;

    db.get(`SELECT * FROM ${table} WHERE id = ?`, [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (!row) {
            res.status(404).json({ error: `${table} not found` });
        } else {
            res.json({ data: row });
        }
    });
});

// UPDATE: Update a record by ID in any table
app.put('/api/:table/:id', ensureDbSelected, (req, res) => {
    const { table, id } = req.params;
    const data = req.body;

    const updates = Object.keys(data).map(key => `${key} = ?`).join(', ');
    const values = Object.values(data);

    const query = `UPDATE ${table} SET ${updates} WHERE id = ?`;

    db.run(query, [...values, id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ updatedRows: this.changes });
    });
});

// DELETE: Delete a record by ID from any table
app.delete('/api/:table/delete/:id', ensureDbSelected, (req, res) => {
    const { table, id } = req.params;

    const query = `DELETE FROM ${table} WHERE id = ?`;

    db.run(query, [id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        // Returning the ID of the deleted record for confirmation
        res.json({ deletedRows: this.changes, deletedRecordId: id });
    });
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
