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

    // Insert initial data
    const teams = [
        [1, 'New York Yankees', 'New York, NY', 'AL', 'NYY', 27],
        [2, 'Los Angeles Dodgers', 'Los Angeles, CA', 'NL', 'LAD', 7],
        [3, 'San Francisco Giants', 'San Francisco, CA', 'NL', 'SF', 8],
        [4, 'Boston Red Sox', 'Boston, MA', 'AL', 'BOS', 9],
        [5, 'St. Louis Cardinals', 'St. Louis, MO', 'NL', 'STL', 11],
        [6, 'Chicago Cubs', 'Chicago, IL', 'NL', 'CHC', 3],
        [7, 'Atlanta Braves', 'Atlanta, GA', 'NL', 'ATL', 4],
        [8, 'Houston Astros', 'Houston, TX', 'AL', 'HOU', 2],
        [9, 'Oakland Athletics', 'Oakland, CA', 'AL', 'OAK', 9],
        [10, 'Detroit Tigers', 'Detroit, MI', 'AL', 'DET', 4],
        [11, 'Cleveland Guardians', 'Cleveland, OH', 'AL', 'CLE', 2],
        [12, 'Philadelphia Phillies', 'Philadelphia, PA', 'NL', 'PHI', 2],
        [13, 'Minnesota Twins', 'Minneapolis, MN', 'AL', 'MIN', 3],
        [14, 'Pittsburgh Pirates', 'Pittsburgh, PA', 'NL', 'PIT', 5],
        [15, 'Cincinnati Reds', 'Cincinnati, OH', 'NL', 'CIN', 5],
        [16, 'Baltimore Orioles', 'Baltimore, MD', 'AL', 'BAL', 3],
        [17, 'Toronto Blue Jays', 'Toronto, ON', 'AL', 'TOR', 2],
        [18, 'Kansas City Royals', 'Kansas City, MO', 'AL', 'KC', 2],
        [19, 'New York Mets', 'New York, NY', 'NL', 'NYM', 2],
        [20, 'Washington Nationals', 'Washington, D.C.', 'NL', 'WSH', 1],
        [21, 'Miami Marlins', 'Miami, FL', 'NL', 'MIA', 2],
        [22, 'Tampa Bay Rays', 'St. Petersburg, FL', 'AL', 'TB', 0],
        [23, 'San Diego Padres', 'San Diego, CA', 'NL', 'SD', 0],
        [24, 'Seattle Mariners', 'Seattle, WA', 'AL', 'SEA', 0],
        [25, 'Texas Rangers', 'Arlington, TX', 'AL', 'TEX', 2],
        [26, 'Los Angeles Angels', 'Anaheim, CA', 'AL', 'LAA', 1],
        [27, 'Milwaukee Brewers', 'Milwaukee, WI', 'NL', 'MIL', 0],
        [28, 'Arizona Diamondbacks', 'Phoenix, AZ', 'NL', 'ARI', 1],
        [29, 'Colorado Rockies', 'Denver, CO', 'NL', 'COL', 0],
        [30, 'Chicago White Sox', 'Chicago, IL', 'AL', 'CWS', 3]
    ];

    const stmt = db.prepare(`INSERT INTO mlb_teams (id, name, location, league, abbreviation, championships) VALUES (?, ?, ?, ?, ?, ?)`);
    teams.forEach(team => stmt.run(team));
    stmt.finalize();

    console.log('Database initialized with MLB teams data');
});

db.close();
