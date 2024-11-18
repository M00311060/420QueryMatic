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
  const [championships, setChampionships] = useState(['0', '1', '2', '3', '4', '5','6','7','8','9','10']);
  const [selectedChampionships, setSelectedChampionships] = useState('');
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
    navigate('/results', { state: { FilterTeamsData: teams, selectedLeague: 'All Leagues', sqlQuery: allTeamsQuery } });
  };

  const handleShowLeagueTeams = () => {
    axios.get(`http://localhost:3001/api/nfl-teams/league/${selectedLeague}`)
      .then((response) => {
        const leagueQuery = `SELECT * FROM nfl_teams WHERE league = '${selectedLeague}'`;
        navigate('/results', { state: { FilterTeamsData: response.data.data, selectedLeague, sqlQuery: leagueQuery } });
      })
      .catch((error) => {
        console.error('Error fetching teams by league:', error);
      });
  };

  const handleShowChampionshipTeams = () => {
    axios.get(`http://localhost:3001/api/nfl-teams/championships/${selectedChampionships}`)
      .then((response) => {
        const championshipQuery = `SELECT * FROM nfl_teams WHERE championships = ${selectedChampionships}`;
        navigate('/results', { state: { FilterTeamsData: response.data.data, selectedChampionships, sqlQuery: championshipQuery } });
      })
      .catch((error) => {
        console.error('Error fetching teams by championships:', error);
      });
  };

  return (
    <div className="container">
      <HeaderPromptBuilderPage className="header" />

      <div className ="title">
            <h1>Select From Database</h1>
      </div>

      <h3>Select an ID</h3>
      <select onChange={handleSelectTeam} value={selectedTeamId}>
        <option value="">--Select ID--</option>
        {teams.map((team) => (
          <option key={team.id} value={team.id}>
            {team.id}
          </option>
        ))}
      </select>
      <button onClick={handleProceed} disabled={!selectedTeamId}>Proceed to Results</button>
      
      <h3>Filter</h3>
      <select onChange={(e) => setSelectedLeague(e.target.value)} value={selectedLeague}>
        <option value="">--Select league--</option>
        {leagues.map((league) => (
          <option key={league} value={league}>{league}</option>
        ))}
      </select>
      <button onClick={handleShowLeagueTeams} disabled={!selectedLeague}>Filter</button>
      <select onChange={(e) => setSelectedChampionships(e.target.value)} value={selectedChampionships}>
        <option value="">--Select Championships--</option>
        {championships.map((count) => (
          <option key={count} value={count}>{count}</option>
        ))}
      </select>
      <button onClick={handleShowChampionshipTeams} disabled={!selectedChampionships}>Filter</button>
      <button onClick={handleShowAllTeams}>Show All</button>

      <FooterPromptBuilderPage className="footer" />
    </div>
  );
};

export default PromptSelect;
