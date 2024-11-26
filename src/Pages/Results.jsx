import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import FooterResultsPage from '../Components/Footers/FooterResultsPage';
import HeaderResultsPage from '../Components/Headers/HeaderResultsPage';

const Results = () => {
  const location = useLocation();
  const [teamData, setTeamData] = useState(null);
  const [filterData, setFilterData] = useState([]);

  // Extract data from location state
  const selectedEntity = location.state?.selectedEntity;
  const selectedId = location.state?.selectedTeamId;
  const sqlQuery = location.state?.sqlQuery;
  const deletedItem = location.state?.deletedItem;
  const FilterData = location.state?.FilterData;

  // If filterData is provided, we update the filterData state
  useEffect(() => {
    if (FilterData) {
      setFilterData(Array.isArray(FilterData[0]) ? FilterData[0] : FilterData);
    }
  }, [FilterData]);

   // Fetch team data if selectedTeamId is available
   useEffect(() => {
    if (selectedId) {
      axios.get(`http://localhost:3001/api/teams/${selectedId}`) // Adjust this API endpoint as per your back-end
        .then((response) => {
          setTeamData(response.data); // Set the fetched team data
        })
        .catch((error) => {
          console.error('Error fetching team data:', error);
        });
    }
  }, [selectedId]);

  return (
    <div>
      <HeaderResultsPage />
      <h3>Results</h3>

      {deletedItem ? (
        <p>Record "{deletedItem}" has been deleted successfully.</p> 
      ) : teamData ? (
        <div>
          <p><strong>Team Name:</strong> {teamData.name}</p>
          <p><strong>Location:</strong> {teamData.location}</p>
          <p><strong>League:</strong> {teamData.league}</p>
          <p><strong>Abbreviation:</strong> {teamData.abbreviation}</p>
          <p><strong>Championships:</strong> {teamData.championships}</p>
          <p><strong>SQL Query:</strong> <code>{sqlQuery}</code></p>
        </div>
      ) : filterData && filterData.length > 0 ? (
        <div>
          <h4>Filtered Teams Data:</h4>
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
              {filterData.map((database) => (
                <tr key={database.id}>
                  <td>{database.id}</td>
                  <td>{database.name}</td>
                  <td>{database.location}</td>
                  <td>{database.league}</td>
                  <td>{database.abbreviation}</td>
                  <td>{database.championships}</td>
                </tr>
              ))}
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
