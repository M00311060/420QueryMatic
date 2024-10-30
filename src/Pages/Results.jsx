import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import FooterResultsPage from '../Components/Footers/FooterResultsPage';
import HeaderResultsPage from '../Components/Headers/HeaderResultsPage';

const Results = () => {
  const location = useLocation();
  const [teamData, setTeamData] = useState(null);
  
  // Extract selectedTeamId, sqlQuery, and deletedTeamName from location state
  const selectedTeamId = location.state?.selectedTeamId;
  const sqlQuery = location.state?.sqlQuery;
  const deletedTeamName = location.state?.deletedTeamName;

  useEffect(() => {
    if (selectedTeamId) {
      // Fetch team details if selectedTeamId is provided
      axios.get(`http://localhost:3001/api/nfl-teams/${selectedTeamId}`)
        .then((response) => setTeamData(response.data.data))
        .catch((error) => console.error('Error fetching team details:', error));
    }
  }, [selectedTeamId]);

  return (
    <div>
      <HeaderResultsPage />
      <h3>Selected NFL Team</h3>
      
      {/* Check for deletedTeamName first to display the deletion message */}
      {deletedTeamName ? (
        <p>Team "{deletedTeamName}" has been deleted successfully.</p>
      ) : teamData ? (
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
