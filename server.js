import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const db = new sqlite3.Database('./nflteams.db');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Create NFL teams table if it doesn't exist 
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS nfl_teams (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        location TEXT,
        league TEXT,          -- Add this column
        abbreviation TEXT,    -- Add this column
        championships INTEGER
    )`, (err) => {
        if (err) {
            console.error('Error creating table:', err.message);
        } else {
            console.log('nfl_teams table is ready');

            // Delete any existing records before inserting the new teams
            db.run(`DELETE FROM nfl_teams`, (err) => {
                if (err) {
                    console.error('Error deleting existing records:', err.message);
                } else {
                    console.log('Existing records cleared. Inserting all 32 teams...');
                    
                    // Insert all 32 teams with league and abbreviation columns
                    db.run(`INSERT INTO nfl_teams (name, location, league, abbreviation, championships) VALUES 
                        ('Kansas City Chiefs', 'Kansas City, MO', 'AFC', 'KC', 3),
                        ('San Francisco 49ers', 'San Francisco, CA', 'NFC', 'SF', 5),
                        ('New England Patriots', 'Foxborough, MA', 'AFC', 'NE', 6),
                        ('Dallas Cowboys', 'Dallas, TX', 'NFC', 'DAL', 5),
                        ('Green Bay Packers', 'Green Bay, WI', 'NFC', 'GB', 4),
                        ('Philadelphia Eagles', 'Philadelphia, PA', 'NFC', 'PHI', 1),
                        ('Buffalo Bills', 'Buffalo, NY', 'AFC', 'BUF', 0),
                        ('Tampa Bay Buccaneers', 'Tampa, FL', 'NFC', 'TB', 2),
                        ('Pittsburgh Steelers', 'Pittsburgh, PA', 'AFC', 'PIT', 6),
                        ('Baltimore Ravens', 'Baltimore, MD', 'AFC', 'BAL', 2),
                        ('Cleveland Browns', 'Cleveland, OH', 'AFC', 'CLE', 0),
                        ('Cincinnati Bengals', 'Cincinnati, OH', 'AFC', 'CIN', 0),
                        ('Denver Broncos', 'Denver, CO', 'AFC', 'DEN', 3),
                        ('Las Vegas Raiders', 'Las Vegas, NV', 'AFC', 'LV', 3),
                        ('Los Angeles Chargers', 'Los Angeles, CA', 'AFC', 'LAC', 0),
                        ('Miami Dolphins', 'Miami, FL', 'AFC', 'MIA', 2),
                        ('New York Jets', 'East Rutherford, NJ', 'AFC', 'NYJ', 1),
                        ('New York Giants', 'East Rutherford, NJ', 'NFC', 'NYG', 4),
                        ('Washington Commanders', 'Washington, D.C.', 'NFC', 'WAS', 3),
                        ('Minnesota Vikings', 'Minneapolis, MN', 'NFC', 'MIN', 0),
                        ('Chicago Bears', 'Chicago, IL', 'NFC', 'CHI', 1),
                        ('Detroit Lions', 'Detroit, MI', 'NFC', 'DET', 0),
                        ('Arizona Cardinals', 'Glendale, AZ', 'NFC', 'ARI', 0),
                        ('Atlanta Falcons', 'Atlanta, GA', 'NFC', 'ATL', 0),
                        ('Carolina Panthers', 'Charlotte, NC', 'NFC', 'CAR', 0),
                        ('New Orleans Saints', 'New Orleans, LA', 'NFC', 'NO', 1),
                        ('Los Angeles Rams', 'Los Angeles, CA', 'NFC', 'LAR', 2),
                        ('Seattle Seahawks', 'Seattle, WA', 'NFC', 'SEA', 1),
                        ('Houston Texans', 'Houston, TX', 'AFC', 'HOU', 0),
                        ('Indianapolis Colts', 'Indianapolis, IN', 'AFC', 'IND', 2),
                        ('Jacksonville Jaguars', 'Jacksonville, FL', 'AFC', 'JAX', 0),
                        ('Tennessee Titans', 'Nashville, TN', 'AFC', 'TEN', 0)
                    `, (err) => {
                        if (err) {
                            console.error('Error inserting teams:', err.message);
                        } else {
                            console.log('All 32 teams inserted');
                        }
                    });
                }
            });
        }
    });
});

// API endpoint to get all NFL teams
app.get('/api/nfl-teams', (req, res) => {
    db.all(`SELECT * FROM nfl_teams`, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ data: rows });
    });
});

// Start the server
app.listen(3001, () => {
    console.log('Server is running on port 3001');
});

