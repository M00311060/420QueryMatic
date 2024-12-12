// initializeDB.js
import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./mlbteams.db');

// Create the mlb_teams table
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS mlb_teams (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            location TEXT NOT NULL,
            league TEXT NOT NULL,
            abbreviation TEXT NOT NULL,
            championships INTEGER
        )
    `);

    // Insert initial data for MLB teams
    const teams = [
        [1, 'New York Yankees', 'New York, NY', 'AL', 'NYY', 27],
        [2, 'Boston Red Sox', 'Boston, MA', 'AL', 'BOS', 9],
        [3, 'Chicago Cubs', 'Chicago, IL', 'NL', 'CHC', 3],
        [4, 'Los Angeles Dodgers', 'Los Angeles, CA', 'NL', 'LAD', 7],
        [5, 'San Francisco Giants', 'San Francisco, CA', 'NL', 'SFG', 8],
        [6, 'St. Louis Cardinals', 'St. Louis, MO', 'NL', 'STL', 11],
        [7, 'Detroit Tigers', 'Detroit, MI', 'AL', 'DET', 4],
        [8, 'Atlanta Braves', 'Atlanta, GA', 'NL', 'ATL', 3],
        [9, 'Miami Marlins', 'Miami, FL', 'NL', 'MIA', 2],
        [10, 'Houston Astros', 'Houston, TX', 'AL', 'HOU', 2],
        [11, 'Cleveland Indians', 'Cleveland, OH', 'AL', 'CLE', 0],
        [12, 'Minnesota Twins', 'Minneapolis, MN', 'AL', 'MIN', 3],
        [13, 'Oakland Athletics', 'Oakland, CA', 'AL', 'OAK', 9],
        [14, 'Chicago White Sox', 'Chicago, IL', 'AL', 'CWS', 3],
        [15, 'Philadelphia Phillies', 'Philadelphia, PA', 'NL', 'PHI', 2],
        [16, 'Kansas City Royals', 'Kansas City, MO', 'AL', 'KCR', 2],
        [17, 'Texas Rangers', 'Arlington, TX', 'AL', 'TEX', 0],
        [18, 'Washington Nationals', 'Washington, D.C.', 'NL', 'WSH', 1],
        [19, 'Toronto Blue Jays', 'Toronto, ON', 'AL', 'TOR', 2],
        [20, 'Tampa Bay Rays', 'St. Petersburg, FL', 'AL', 'TBR', 0],
        [21, 'Seattle Mariners', 'Seattle, WA', 'AL', 'SEA', 0],
        [22, 'Arizona Diamondbacks', 'Phoenix, AZ', 'NL', 'ARI', 1],
        [23, 'San Diego Padres', 'San Diego, CA', 'NL', 'SDP', 0],
        [24, 'Baltimore Orioles', 'Baltimore, MD', 'AL', 'BAL', 3],
        [25, 'New York Mets', 'New York, NY', 'NL', 'NYM', 2],
        [26, 'Los Angeles Angels', 'Anaheim, CA', 'AL', 'LAA', 0],
        [27, 'Cincinnati Reds', 'Cincinnati, OH', 'NL', 'CIN', 5],
        [28, 'Pittsburgh Pirates', 'Pittsburgh, PA', 'NL', 'PIT', 5],
        [29, 'Colorado Rockies', 'Denver, CO', 'NL', 'COL', 0],
        [30, 'Milwaukee Brewers', 'Milwaukee, WI', 'NL', 'MIL', 0],
        [31, 'Minnesota Twins', 'Minneapolis, MN', 'AL', 'MIN', 3],
        [32, 'Kansas City Royals', 'Kansas City, MO', 'AL', 'KCR', 2]
    ];

    const stmt = db.prepare(`
        INSERT INTO mlb_teams (id, name, location, league, abbreviation, championships)
        VALUES (?, ?, ?, ?, ?, ?)
    `);
    
    teams.forEach(team => stmt.run(team));
    stmt.finalize();

    console.log('Database initialized with MLB teams data');
});

db.close();
