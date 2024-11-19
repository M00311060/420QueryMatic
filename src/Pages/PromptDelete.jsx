import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FooterPromptBuilderPage from '../Components/Footers/FooterPromptBuilderPage';
import HeaderPromptBuilderPage from '../Components/Headers/HeaderPromptBuilderPage';
import './PagesStyle/PromptBuilder.css';

const PromptDelete = () => {
  // State variables to store databases, tables, columns, and user inputs
  const [databases, setDatabases] = useState([]);
  const [selectedDatabase, setSelectedDatabase] = useState('');
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState('');
  const [columns, setColumns] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState('');
  const [recordId, setRecordId] = useState('');
  const navigate = useNavigate();

  // Fetch the list of available databases
  useEffect(() => {
    axios.get('http://localhost:3001/api/databases')
      .then((response) => {
        setDatabases(response.data.databases);
      })
      .catch((error) => {
        console.error('Error fetching databases:', error);
      });
  }, []);

  // Handle database selection and fetch associated tables
  const handleDatabaseChange = (e) => {
    const selectedDb = e.target.value;
    setSelectedDatabase(selectedDb);

    // Post selected database and fetch tables
    axios.post('http://localhost:3001/api/select-database', { database: selectedDb })
      .then(() => {
        axios.get('http://localhost:3001/api/tables')
          .then((response) => {
            if (response.data.tables) {
              setTables(response.data.tables);
            }
          })
          .catch((error) => {
            console.error('Error fetching tables:', error);
            setTables([]);  // Clear the tables list if an error occurs
          });
      })
      .catch((error) => {
        console.error('Error selecting database:', error);
        setTables([]);  // Clear tables if the database selection fails
      });
  };

  // Handle table selection and fetch associated columns
  const handleTableChange = (e) => {
    const selectedTable = e.target.value;
    setSelectedTable(selectedTable);

    // Fetch columns of the selected table
    axios.get(`http://localhost:3001/api/${selectedTable}/columns`)
      .then((response) => {
        setColumns(response.data.columns);
      })
      .catch((error) => {
        console.error('Error fetching columns:', error);
      });
  };

  // Updates the state with the selected column when a column is chosen from the dropdown
  const handleColumnChange = (e) => {
    setSelectedColumn(e.target.value);
  };
  
  
  const handleDelete = () => {
    if (!recordId || !selectedTable) {
      alert('Please select a table and enter a record ID.');
      return;
    }
    
    // Make an API call to delete the record from the selected table using the provided record ID
    axios.delete(`http://localhost:3001/api/${selectedTable}/delete/${recordId}`)
      .then((response) => {
        setRecordId(''); // Clear the recorded ID
  
        // Navigate to Results page with the state
        navigate('/results', {
          state: {
            selectedEntity: selectedDatabase,
            sqlQuery: `SELECT * FROM ${selectedTable} WHERE id = ${recordId}`,
            deletedItem: recordId, // Pass the team name
          }
        });
      })
      .catch((error) => {
        console.error('Error deleting record:', error);
        alert('Failed to delete the record. Please try again.');
      });
  };
  
  return (
    <div className="prompt-delete">
      <HeaderPromptBuilderPage />
      <div className="content">
        <h1>Delete Record</h1>

        {/* Database dropdown */}
        <div className="form-group">
          <label>Select Database:</label>
          <select value={selectedDatabase} onChange={handleDatabaseChange}>
            <option value="">--Select Database--</option>
            {databases.map((db) => (
              <option key={db} value={db}>{db}</option>
            ))}
          </select>
        </div>

        {/* Table dropdown */}
        <div className="form-group">
          <label>Select Table:</label>
          <select value={selectedTable} onChange={handleTableChange}>
            <option value="">--Select Table--</option>
            {tables.map((table) => (
              <option key={table} value={table}>{table}</option>
            ))}
          </select>
        </div>

        {/* Input field for record ID */}
        <div className="form-group">
          <label>Record ID:</label>
          <input
            type="text"
            value={recordId}
            onChange={(e) => setRecordId(e.target.value)}
            placeholder="Enter Record ID"
          />
        </div>

        {/* Delete button */}
        <button onClick={handleDelete}>Delete Record</button>
      </div>
      <FooterPromptBuilderPage />
    </div>
  );
};

export default PromptDelete;