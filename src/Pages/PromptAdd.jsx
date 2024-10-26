import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FooterPromptBuilderPage from '../Components/Footers/FooterPromptBuilderPage';
import HeaderPromptBuilderPage from '../Components/Headers/HeaderPromptBuilderPage';
import './PagesStyle/PromptBuilder.css';

const PromptAdd = () => {
  const [teams, setTeams] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [selectedTeamName, setSelectedTeamName] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [sqlQuery, setSqlQuery] = useState('');
  const [newTeam, setNewTeam] = useState({ name: '', location: '', league: '', abbreviation: '', championships: 0 });
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

  const handleShowResults = () => {
    setShowResults(true);
  };

  const handleCreateTeam = () => {
    if (!newTeam.name || !newTeam.location || !newTeam.league || !newTeam.abbreviation) {
      alert('Please fill in all fields.');
      return;
    }

    axios.post('http://localhost:3001/api/nfl-teams', newTeam)
      .then((response) => {
        alert('New team created successfully!');
        const createdTeam = response.data;

        navigate('/results', {
          state: {
            selectedTeamId: createdTeam.id,
            selectedTeamName: createdTeam.name,
            sqlQuery: `INSERT INTO nfl_teams (name, location, league, abbreviation, championships) VALUES ('${createdTeam.name}', '${createdTeam.location}', '${createdTeam.league}', '${createdTeam.abbreviation}', ${createdTeam.championships})`
          }
        });

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

export default PromptAdd;
