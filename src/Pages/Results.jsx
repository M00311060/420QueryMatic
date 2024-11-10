//Imports 
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import FooterResultsPage from '../Components/Footers/FooterResultsPage';
import HeaderResultsPage from '../Components/Headers/HeaderResultsPage';

const Results = () => {
  const location = useLocation();
  const [teamData, setTeamData] = useState(null);
  
  // Extract data from location state
  const selectedTeamId = location.state?.selectedTeamId;
  const sqlQuery = location.state?.sqlQuery;
  const deletedTeamName = location.state?.deletedTeamName;
  const FilterTeamsData = location.state?.FilterTeamsData;

  useEffect(() => {
    if (selectedTeamId) {
      axios.get(`http://localhost:3001/api/nfl-teams/${selectedTeamId}`)
        .then((response) => setTeamData(response.data.data))
        .catch((error) => console.error('Error fetching team details:', error));
    }
  }, [selectedTeamId]);

  return (
    <div>
      <HeaderResultsPage />
      <h3>Results</h3>
      
      {deletedTeamName ? (
        <p>Data "{deletedTeamName}" has been deleted successfully.</p>
      ) : teamData ? (
        <div>
          <p><strong>Team Name:</strong> {teamData.name}</p>
          <p><strong>Location:</strong> {teamData.location}</p>
          <p><strong>League:</strong> {teamData.league}</p>
          <p><strong>Abbreviation:</strong> {teamData.abbreviation}</p>
          <p><strong>Championships:</strong> {teamData.championships}</p>
          <p><strong>SQL Query:</strong> <code>{sqlQuery}</code></p>
        </div>
      ) : FilterTeamsData ? (
        <div>
            <h4>Filtered Data:</h4>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Location</th>
                        <th>League</th>
                        <th>Abbreviation</th>
                        <th>Championships</th>
                    </tr>
                </thead>
                <tbody>
                    {FilterTeamsData.length > 0 ? (
                        FilterTeamsData.map((team) => (
                            <tr key={team.id}>
                                <td>{team.id}</td>
                                <td>{team.name}</td>
                                <td>{team.location}</td>
                                <td>{team.league}</td>
                                <td>{team.abbreviation}</td>
                                <td>{team.championships}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No teams found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
          <h4>SQL Command:</h4>
          <code>{sqlQuery}</code>
        </div>
      ) : (
        <p>No data selected or unable to fetch details.</p>
      )}

      <FooterResultsPage />
    </div>
  );
};

export default Results;
