import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FooterPromptBuilderPage from '../Components/Footers/FooterPromptBuilderPage';
import HeaderPromptBuilderPage from '../Components/Headers/HeaderPromptBuilderPage';
import './PagesStyle/PromptBuilder.css';

const PromptDelete = () => {
  const [teams, setTeams] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [selectedTeamName, setSelectedTeamName] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [sqlQuery, setSqlQuery] = useState('');
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

  const handleDelete = () => {
    if (selectedTeamId) {
      const confirmDelete = window.confirm(`Are you sure you want to delete team ${selectedTeamName}?`);
      if (confirmDelete) {
        axios.delete(`http://localhost:3001/api/nfl-teams/${selectedTeamId}`)
          .then(() => {
            alert(`Team ${selectedTeamName} deleted successfully!`);
            const deletedTeamName = selectedTeamName;

            setTeams(teams.filter((team) => team.id !== parseInt(selectedTeamId)));
            setSelectedTeamId(null);
            setSelectedTeamName(null);
            setSqlQuery('');

            // Navigate to the results page, passing the deleted team name
            navigate('/results', { state: { deletedTeamName } });
          })
          .catch((error) => {
            console.error('Error deleting team:', error);
            alert('Failed to delete team.');
          });
      }
    }
  };

  return (
    <div className="container">
      <HeaderPromptBuilderPage className="header" />

      <div className ="title">
            <h1>Delete From Database</h1>
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
      <button onClick={handleDelete} disabled={!selectedTeamId}>Delete</button>

      {showResults && (
        <div>
          <h4>SQL Command:</h4>
          <code>{sqlQuery}</code>
        </div>
      )}

      <FooterPromptBuilderPage className="footer" />
    </div>
  );
};

export default PromptDelete;
