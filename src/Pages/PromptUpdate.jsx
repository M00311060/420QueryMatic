import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FooterPromptBuilderPage from '../Components/Footers/FooterPromptBuilderPage';
import HeaderPromptBuilderPage from '../Components/Headers/HeaderPromptBuilderPage';
import './PagesStyle/PromptBuilder.css';

const PromptUpdate = () => {
  const [teams, setTeams] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [selectedTeamName, setSelectedTeamName] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [sqlQuery, setSqlQuery] = useState('');
  const [updateTeam, setUpdateTeam] = useState(null); // State for updating a team
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
    setUpdateTeam(selectedTeam || null); // Populate update form with selected team's data
    setSqlQuery(`SELECT * FROM nfl_teams WHERE id = ${selectedTeamId}`);
  };

  const handleProceed = () => {
    if (selectedTeamId && selectedTeamName) {
      navigate('/results', { state: { selectedTeamId, selectedTeamName, sqlQuery } });
    }
  };

  const handleShowResults = () => {
    setShowResults(true);
  };

  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateTeam(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleUpdateTeam = () => {
    if (updateTeam) {
      axios.put(`http://localhost:3001/api/nfl-teams/${updateTeam.id}`, updateTeam)
        .then(() => {
          alert('Team updated successfully!');
          setTeams(teams.map((team) => (team.id === updateTeam.id ? updateTeam : team)));
          setSqlQuery(`UPDATE nfl_teams SET name = '${updateTeam.name}', location = '${updateTeam.location}', league = '${updateTeam.league}', abbreviation = '${updateTeam.abbreviation}', championships = ${updateTeam.championships} WHERE id = ${updateTeam.id}`);
          setShowResults(true);
        })
        .catch((error) => {
          console.error('Error updating team:', error);
          alert('Failed to update team.');
        });
    }
  };

  return (
    <div className="container">
      <HeaderPromptBuilderPage className="header" />

      <div className ="title">
            <h1>Edit The Database</h1>
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
      <button onClick={handleShowResults} disabled={!selectedTeamId}>Show Results</button>

      {updateTeam && (
        <div>
          <h3>Update Selected ID</h3>
          <input type="text" name="name" placeholder="Team Name" value={updateTeam.name} onChange={handleUpdateInputChange} />
          <input type="text" name="location" placeholder="Location" value={updateTeam.location} onChange={handleUpdateInputChange} />
          <input type="text" name="league" placeholder="League" value={updateTeam.league} onChange={handleUpdateInputChange} />
          <input type="text" name="abbreviation" placeholder="Abbreviation" value={updateTeam.abbreviation} onChange={handleUpdateInputChange} />
          <input type="number" name="championships" placeholder="Championships" value={updateTeam.championships} onChange={handleUpdateInputChange} />
          <button onClick={handleUpdateTeam}>Update</button>
        </div>
      )}

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

export default PromptUpdate;
