import React from 'react';
import { useLocation } from 'react-router-dom';
import FooterResultsPage from '../Components/Footers/FooterResultsPage';
import HeaderResultsPage from '../Components/Headers/HeaderResultsPage';

const Results = () => {
  const location = useLocation();
  
  // Get selectedTeamName and sqlQuery from the state
  const selectedTeamName = location.state?.selectedTeamName;
  const sqlQuery = location.state?.sqlQuery;

  return (
    <div>
      <HeaderResultsPage />
      <h3>Selected NFL Team</h3>
      {selectedTeamName ? (
        <div>
          <p>Team: {selectedTeamName}</p>
          <p>SQL Query: <code>{sqlQuery}</code></p>
        </div>
      ) : (
        <p>No team selected.</p>
      )}
      <FooterResultsPage />
    </div>
  );
};

export default Results;



