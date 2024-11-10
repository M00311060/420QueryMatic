import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const db = new sqlite3.Database('./nflteams.db');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// CREATE: Add a new NFL team
app.post('/api/nfl-teams', (req, res) => {
    console.log('Request Body:', req.body); // Log the request body
    const { name, location, league, abbreviation, championships } = req.body;
    db.run(
        `INSERT INTO nfl_teams (name, location, league, abbreviation, championships) VALUES (?, ?, ?, ?, ?)`,
        [name, location, league, abbreviation, championships],
        function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            // Include all the new team's details in the response
            res.status(201).json({ 
                id: this.lastID, 
                name, 
                location, 
                league, 
                abbreviation, 
                championships 
            });
        }
    );
});

// READ: Get all NFL teams
app.get('/api/nfl-teams', (req, res) => {
    db.all(`SELECT * FROM nfl_teams`, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ data: rows });
    });
});

// READ: Get a single NFL team by ID
app.get('/api/nfl-teams/:id', (req, res) => {
    const { id } = req.params;
    db.get(`SELECT * FROM nfl_teams WHERE id = ?`, [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (!row) {
            res.status(404).json({ error: 'Team not found' });
        } else {
            res.json({ data: row });
        }
    });
});

// READ: Get teams by league
app.get('/api/nfl-teams/league/:league', (req, res) => {
    const league = req.params.league;
    db.all(`SELECT * FROM nfl_teams WHERE league = ?`, [league], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ data: rows });
    });
});

// READ: Get teams by championships
app.get('/api/nfl-teams/championships/:championships', (req, res) => {
    const championships = req.params.championships;
    db.all(`SELECT * FROM nfl_teams WHERE championships = ?`, [championships], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ data: rows });
    });
});

// UPDATE: Update an NFL team by ID
app.put('/api/nfl-teams/:id', (req, res) => {
    const { id } = req.params;
    const { name, location, league, abbreviation, championships } = req.body;
    db.run(
        `UPDATE nfl_teams SET name = ?, location = ?, league = ?, abbreviation = ?, championships = ? WHERE id = ?`,
        [name, location, league, abbreviation, championships, id],
        function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ updatedRows: this.changes });
        }
    );
});

// DELETE: Delete an NFL team by ID
app.delete('/api/nfl-teams/:id', (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM nfl_teams WHERE id = ?`, [id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ deletedRows: this.changes });
    });
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

