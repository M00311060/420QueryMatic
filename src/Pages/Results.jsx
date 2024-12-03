import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import FooterResultsPage from '../Components/Footers/FooterResultsPage';
import HeaderResultsPage from '../Components/Headers/HeaderResultsPage';

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
    <div>
      <HeaderResultsPage />
      <h3>Results</h3>
      {deletedItem ? (
        <p>Record "{deletedItem}" has been deleted successfully.</p>
      ): filterData.length > 0 ? (
        <div>
          <h4>Filtered Data:</h4>
          <table>
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
          <h4>SQL Command:</h4>
          <code>{sqlQuery}</code>
        </div>
      ) : (
        <p>No data found or unable to fetch details.</p>
      )}

      <FooterResultsPage />
    </div>
  );
};

export default Results;
