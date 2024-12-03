import sqlite3 from 'sqlite3';

// Create a new SQLite3 database or open an existing one
const db = new sqlite3.Database('./users.db');

// Create the users table
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            password TEXT NOT NULL,
            first_name TEXT,
            last_name TEXT
        )
    `);

    // Insert more user data
    const users = [
        ['john_doe', 'password123', 'John', 'Doe'],
        ['jane_smith', 'password456', 'Jane', 'Smith'],
        ['mike_jones', 'password789', 'Mike', 'Jones'],
        ['alice_williams', 'password321', 'Alice', 'Williams'],
        ['bob_brown', 'password654', 'Bob', 'Brown'],
        ['charlie_davis', 'password987', 'Charlie', 'Davis'],
        ['daniel_miller', 'password234', 'Daniel', 'Miller'],
        ['emma_martin', 'password876', 'Emma', 'Martin'],
        ['frank_clark', 'password111', 'Frank', 'Clark'],
        ['grace_roberts', 'password222', 'Grace', 'Roberts'],
        ['hannah_lewis', 'password333', 'Hannah', 'Lewis'],
        ['ian_wilson', 'password444', 'Ian', 'Wilson'],
        ['jack_hall', 'password555', 'Jack', 'Hall'],
        ['karen_allen', 'password666', 'Karen', 'Allen'],
        ['leo_scott', 'password777', 'Leo', 'Scott'],
        ['mia_young', 'password888', 'Mia', 'Young'],
        ['noah_king', 'password999', 'Noah', 'King'],
        ['olivia_taylor', 'password000', 'Olivia', 'Taylor'],
        ['paul_anderson', 'password1234', 'Paul', 'Anderson']
    ];

    const stmt = db.prepare(`INSERT INTO users (username, password, first_name, last_name) VALUES (?, ?, ?, ?)`);
    users.forEach(user => stmt.run(user));
    stmt.finalize();

    console.log('Database initialized with user data');
});

// Close the database connection
db.close();
