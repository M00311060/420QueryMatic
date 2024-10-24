import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FooterPromptBuilderPage from '../Components/Footers/FooterPromptBuilderPage';
import HeaderPromptBuilderPage from '../Components/Headers/HeaderPromptBuilderPage';
import './PagesStyle/PromptBuilder.css';

const PromptBuilder = () => {
  const [teams, setTeams] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [selectedTeamName, setSelectedTeamName] = useState(null);
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

    // Set the selected team's ID and name
    setSelectedTeamId(selectedTeamId);
    setSelectedTeamName(selectedTeam.name);
  };

  const handleProceed = () => {
    if (selectedTeamId && selectedTeamName) {
      // Construct the SQL query
      const sqlQuery = `SELECT * FROM nfl_teams WHERE id = ${selectedTeamId}`;

      // Navigate to the results page and pass the team name and SQL query
      navigate('/results', { state: { selectedTeamName, sqlQuery } });
    }
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
      <button onClick={handleProceed} disabled={!selectedTeamId}>See Results</button>
      <FooterPromptBuilderPage className="footer" />
    </div>
  );
};

export default PromptBuilder;

