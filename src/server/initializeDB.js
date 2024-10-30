// initializeDB.js
import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./nflteams.db');

// Create the nfl_teams table
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS nfl_teams (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            location TEXT NOT NULL,
            league TEXT NOT NULL,
            abbreviation TEXT NOT NULL,
            championships INTEGER
        )
    `);

    // Insert initial data
    const teams = [
        [1, 'Kansas City Chiefs', 'Kansas City, MO', 'AFC', 'KC', 3],
        [2, 'San Francisco 49ers', 'San Francisco, CA', 'NFC', 'SF', 5],
        [3, 'New England Patriots', 'Foxborough, MA', 'AFC', 'NE', 6],
        [4, 'Dallas Cowboys', 'Dallas, TX', 'NFC', 'DAL', 5],
        [5, 'Green Bay Packers', 'Green Bay, WI', 'NFC', 'GB', 4],
        [6, 'Philadelphia Eagles', 'Philadelphia, PA', 'NFC', 'PHI', 1],
        [7, 'Buffalo Bills', 'Buffalo, NY', 'AFC', 'BUF', 0],
        [8, 'Tampa Bay Buccaneers', 'Tampa, FL', 'NFC', 'TB', 2],
        [9, 'Pittsburgh Steelers', 'Pittsburgh, PA', 'AFC', 'PIT', 6],
        [10, 'Baltimore Ravens', 'Baltimore, MD', 'AFC', 'BAL', 3],
        [11, 'Cleveland Browns', 'Cleveland, OH', 'AFC', 'CLE', 0],
        [12, 'Denver Broncos', 'Denver, CO', 'AFC', 'DEN', 3],
        [13, 'Las Vegas Raiders', 'Las Vegas, NV', 'AFC', 'LV', 4],
        [14, 'Los Angeles Chargers', 'Los Angeles, CA', 'AFC', 'LAC', 0],
        [15, 'Miami Dolphins', 'Miami, FL', 'AFC', 'MIA', 2],
        [16, 'New York Jets', 'East Rutherford, NJ', 'AFC', 'NYJ', 1],
        [17, 'New York Giants', 'East Rutherford, NJ', 'NFC', 'NYG', 4],
        [18, 'Washington Commanders', 'Washington, D.C.', 'NFC', 'WAS', 3],
        [20, 'Chicago Bears', 'Chicago, IL', 'NFC', 'CHI', 1],
        [21, 'Detroit Lions', 'Detroit, MI', 'NFC', 'DET', 0],
        [22, 'Arizona Cardinals', 'Glendale, AZ', 'NFC', 'ARI', 0],
        [23, 'Atlanta Falcons', 'Atlanta, GA', 'NFC', 'ATL', 0],
        [24, 'Carolina Panthers', 'Charlotte, NC', 'NFC', 'CAR', 0],
        [25, 'Los Angeles Rams', 'Los Angeles, CA', 'NFC', 'LAR', 2],
        [26, 'Seattle Seahawks', 'Seattle, WA', 'NFC', 'SEA', 1],
        [27, 'Houston Texans', 'Houston, TX', 'AFC', 'HOU', 0],
        [28, 'Indianapolis Colts', 'Indianapolis, IN', 'AFC', 'IND', 2],
        [29, 'Jacksonville Jaguars', 'Jacksonville, FL', 'AFC', 'JAX', 0],
        [30, 'Tennessee Titans', 'Nashville, TN', 'AFC', 'TEN', 0],
        [31, 'New Orleans Saints', 'New Orleans, LA', 'NFC', 'NO', 1],
        [32, 'Cincinnati Bengals', 'Cincinnati, OH', 'AFC', 'CIN', 0]
    ];

    const stmt = db.prepare(`INSERT INTO nfl_teams (id, name, location, league, abbreviation, championships) VALUES (?, ?, ?, ?, ?, ?)`);
    teams.forEach(team => stmt.run(team));
    stmt.finalize();

    console.log('Database initialized with NFL teams data');
});

db.close();
