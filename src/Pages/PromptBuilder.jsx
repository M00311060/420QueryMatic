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
  const [showResults, setShowResults] = useState(false);
  const [sqlQuery, setSqlQuery] = useState('');
  const [newTeam, setNewTeam] = useState({ name: '', location: '', league: '', abbreviation: '', championships: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the list of NFL teams
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
    setSelectedTeamName(selectedTeam?.name || null);
    
    // Construct the SQL query
    setSqlQuery(`SELECT * FROM nfl_teams WHERE id = ${selectedTeamId}`);
  };

  const handleProceed = () => {
    if (selectedTeamId && selectedTeamName) {
      // Navigate to the results page and pass the team name and SQL query
      navigate('/results', { state: { selectedTeamId, selectedTeamName, sqlQuery } });
    }
  };

  const handleShowResults = () => {
    setShowResults(true);
  };

  const handleDelete = () => {
    if (selectedTeamId) {
      // Confirm deletion
      const confirmDelete = window.confirm(`Are you sure you want to delete team ${selectedTeamName}?`);
      if (confirmDelete) {
        axios.delete(`http://localhost:3001/api/nfl-teams/${selectedTeamId}`)
          .then(() => {
            alert('Team deleted successfully!');
            // Update the team list
            setTeams(teams.filter((team) => team.id !== parseInt(selectedTeamId)));
            // Clear the selection
            setSelectedTeamId(null);
            setSelectedTeamName(null);
            setSqlQuery('');
          })
          .catch((error) => {
            console.error('Error deleting team:', error);
            alert('Failed to delete team.');
          });
      }
    }
  };

  const handleCreateTeam = () => {
    // Validate team data
    if (!newTeam.name || !newTeam.location || !newTeam.league || !newTeam.abbreviation) {
      alert('Please fill in all fields.');
      return;
    }

    // Send POST request to create a new team
    axios.post('http://localhost:3001/api/nfl-teams', newTeam)
      .then((response) => {
        alert('New team created successfully!');
        const createdTeam = response.data; // Get the entire created team object

        // Navigate to the results page and pass the new team's details
        navigate('/results', {
          state: {
            selectedTeamId: createdTeam.id,
            selectedTeamName: createdTeam.name,
            sqlQuery: `INSERT INTO nfl_teams (name, location, league, abbreviation, championships) VALUES ('${createdTeam.name}', '${createdTeam.location}', '${createdTeam.league}', '${createdTeam.abbreviation}', ${createdTeam.championships})`
          }
        });

        // Clear the new team form
        setNewTeam({ name: '', location: '', league: '', abbreviation: '', championships: 0 });
      })
      .catch((error) => {
        console.error('Error creating team:', error);
        alert('Failed to create team.');
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTeam(prevState => ({
      ...prevState,
      [name]: value
    }));
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
      <button onClick={handleShowResults} disabled={!selectedTeamId}>Show Results</button>
      <button onClick={handleDelete} disabled={!selectedTeamId}>Delete Team</button>

      {/* New Team Creation Form */}
      <h3>Create a New NFL Team</h3>
      <input type="text" name="name" placeholder="Team Name" value={newTeam.name} onChange={handleInputChange} />
      <input type="text" name="location" placeholder="Location" value={newTeam.location} onChange={handleInputChange} />
      <input type="text" name="league" placeholder="League" value={newTeam.league} onChange={handleInputChange} />
      <input type="text" name="abbreviation" placeholder="Abbreviation" value={newTeam.abbreviation} onChange={handleInputChange} />
      <input type="number" name="championships" placeholder="Championships" value={newTeam.championships} onChange={handleInputChange} />
      <button onClick={handleCreateTeam}>Create Team</button>

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

export default PromptBuilder;


