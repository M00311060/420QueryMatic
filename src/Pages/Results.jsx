import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import FooterResultsPage from '../Components/Footers/FooterResultsPage';
import HeaderResultsPage from '../Components/Headers/HeaderResultsPage';
import './PagesStyle/ResultsStyle.css';

const Results = () => {
  const location = useLocation();
  const [filterData, setFilterData] = useState([]);
  const [columns, setColumns] = useState([]);
  const sqlQuery = location.state?.sqlQuery || 'No query provided';
  const deletedItem = location.state?.deletedItem;

  useEffect(() => {
    console.log("Location state:", location.state);

    // Set data and columns
    const data = location.state?.FilterData || [];
    setFilterData(data);
    if (data.length > 0) {
      setColumns(Object.keys(data[0]));
    }
  }, [location.state]);

  return (
    <div class="container">
      <HeaderResultsPage />
      <h3 className="results-header">Results</h3>
      {deletedItem ? (
        <div className="deleted-item-container">
        <p className="deleted-item-message">
          Record "{deletedItem}" has been deleted successfully.
        </p>
      </div>
      ): filterData.length > 0 ? (
        <div>
          <h4 className="filtered-data-header">Filtered Data:</h4>
          <table className="table-styled">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filterData.map((record, index) => (
                <tr key={index}>
                  {columns.map((col) => (
                    <td key={col}>{record[col]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <h4 className="sql-command-header">SQL Command:</h4>
          <code className="sql-command">{sqlQuery}</code>
        </div>
      ) : (
        <div className="no-data-container">
        <p className="no-data-message">No data found or unable to fetch details.</p>
      </div>
      )}

      <FooterResultsPage />
    </div>
  );
};

export default Results;
