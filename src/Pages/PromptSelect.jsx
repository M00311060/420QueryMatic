import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FooterPromptBuilderPage from '../Components/Footers/FooterPromptBuilderPage';
import HeaderPromptBuilderPage from '../Components/Headers/HeaderPromptBuilderPage';
import './PagesStyle/PromptBuilder.css';

const PromptSelect = () => {
  const [teams, setTeams] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [selectedTeamName, setSelectedTeamName] = useState(null);
  const [sqlQuery, setSqlQuery] = useState('');
  const [leagues, setLeagues] = useState(['AFC', 'NFC']);
  const [selectedLeague, setSelectedLeague] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/api/nfl-teams')
      .then((response) => {
        setTeams(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching NFL teams:', error);
      });
  }, []);

  const handleSelectTeam = (e) => {
    const selectedTeamId = e.target.value;
    const selectedTeam = teams.find((team) => team.id === parseInt(selectedTeamId));

    setSelectedTeamId(selectedTeamId);
    setSelectedTeamName(selectedTeam?.name || null);
    setSqlQuery(`SELECT * FROM nfl_teams WHERE id = ${selectedTeamId}`);
  };

  const handleProceed = () => {
    if (selectedTeamId && selectedTeamName) {
      navigate('/results', { state: { selectedTeamId, selectedTeamName, sqlQuery } });
    }
  };

  const handleShowAllTeams = () => {
    const allTeamsQuery = 'SELECT * FROM nfl_teams';
    navigate('/results', { state: { leagueTeamsData: teams, selectedLeague: 'All Leagues', sqlQuery: allTeamsQuery } });
  };

  const handleShowLeagueTeams = () => {
    axios.get(`http://localhost:3001/api/nfl-teams/league/${selectedLeague}`)
      .then((response) => {
        const leagueQuery = `SELECT * FROM nfl_teams WHERE league = '${selectedLeague}'`;
        navigate('/results', { state: { leagueTeamsData: response.data.data, selectedLeague, sqlQuery: leagueQuery } });
      })
      .catch((error) => {
        console.error('Error fetching teams by league:', error);
      });
  };

  return (
    <div className="container">
      <HeaderPromptBuilderPage className="header" />
      <h3>Select an NFL Team ID</h3>
      <select onChange={handleSelectTeam} value={selectedTeamId}>
        <option value="">--Select a Team ID--</option>
        {teams.map((team) => (
          <option key={team.id} value={team.id}>
            {team.id}
          </option>
        ))}
      </select>
      <button onClick={handleProceed} disabled={!selectedTeamId}>Proceed to Results</button>
      
      <h3>Filter Teams by League</h3>
      <select onChange={(e) => setSelectedLeague(e.target.value)} value={selectedLeague}>
        <option value="">--Select a League--</option>
        {leagues.map((league) => (
          <option key={league} value={league}>{league}</option>
        ))}
      </select>
      <button onClick={handleShowLeagueTeams} disabled={!selectedLeague}>Show League Teams</button>

      <button onClick={handleShowAllTeams}>Show All Teams</button>

      <FooterPromptBuilderPage className="footer" />
    </div>
  );
};

export default PromptSelect;
