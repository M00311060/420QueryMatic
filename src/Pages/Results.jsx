import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import FooterResultsPage from '../Components/Footers/FooterResultsPage';
import HeaderResultsPage from '../Components/Headers/HeaderResultsPage';

const Results = () => {
  const location = useLocation();
  const [teamData, setTeamData] = useState(null);
  
  // Extract selectedTeamId and sqlQuery from location state
  const selectedTeamId = location.state?.selectedTeamId;
  const sqlQuery = location.state?.sqlQuery;

  useEffect(() => {
    // Log the selectedTeamId to ensure it's passed correctly
    console.log("Selected Team ID:", selectedTeamId);

    // Fetch team details if selectedTeamId is provided
    if (selectedTeamId) {
      axios.get(`http://localhost:3001/api/nfl-teams/${selectedTeamId}`)
        .then((response) => setTeamData(response.data.data))
        .catch((error) => console.error('Error fetching team details:', error));
    }
  }, [selectedTeamId]);

  const handleDelete = () => {
    if (selectedTeamId) {
      axios.delete(`http://localhost:3001/api/nfl-teams/${selectedTeamId}`)
        .then(() => {
          alert('Team deleted successfully!');
          setTeamData(null); // Clear the team data after deletion
        })
        .catch((error) => {
          console.error('Error deleting team:', error);
          alert('Failed to delete team.');
        });
    }
  };

  return (
    <div>
      <HeaderResultsPage />
      <h3>Selected NFL Team</h3>
      {teamData ? (
        <div>
          <p><strong>Team Name:</strong> {teamData.name}</p>
          <p><strong>Location:</strong> {teamData.location}</p>
          <p><strong>League:</strong> {teamData.league}</p>
          <p><strong>Abbreviation:</strong> {teamData.abbreviation}</p>
          <p><strong>Championships:</strong> {teamData.championships}</p>
          <p><strong>SQL Query:</strong> <code>{sqlQuery}</code></p>
        </div>
      ) : (
        <p>No team selected or unable to fetch team details.</p>
      )}
      <FooterResultsPage />
    </div>
  );
};

export default Results;
