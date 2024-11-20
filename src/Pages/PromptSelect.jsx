import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FooterPromptBuilderPage from '../Components/Footers/FooterPromptBuilderPage';
import HeaderPromptBuilderPage from '../Components/Headers/HeaderPromptBuilderPage';
import './PagesStyle/PromptBuilder.css';

const PromptSelect = () => {
  // State variables to store databases, tables, columns, and user inputs
  const [databases, setDatabases] = useState([]);
  const [selectedDatabase, setSelectedDatabase] = useState('');
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState('');
  const [columns, setColumns] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState('');
  const [columnValues, setColumnValues] = useState([]);
  const [filterValue, setFilterValue] = useState('');
  const [recordId, setRecordId] = useState('');
  const [recordData, setRecordData] = useState(null);
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
    const selectedCol = e.target.value;
    setSelectedColumn(selectedCol);
    setColumnValues([]);

    if (selectedCol) {
      // Fetch distinct values for the selected column
      axios.get(`http://localhost:3001/api/${selectedTable}/distinct-values`, {
        params: { column: selectedCol },
      })
        .then((response) => setColumnValues(response.data.values || []))
        .catch((error) => console.error('Error fetching distinct column values:', error));
    }
  };

  // Updates the state with the filter value when the user types in the filter input field
  const handleFilterChange = (e) => {
    setFilterValue(e.target.value);
  };

  // Updates the state with the record ID when the user types in the record ID input field
  const handleRecordIdChange = (e) => {
    setRecordId(e.target.value);
  };

  const handleFilter = () => {
    if (selectedColumn && filterValue && selectedTable) {
      // Perform the column-based filtering
      axios.get(`http://localhost:3001/api/${selectedTable}/filter`, {
        params: {
          column: selectedColumn,
          value: filterValue
        }
      })
      .then((response) => {
        setRecordData(response.data.data);

        // Navigate to Results page with the state
        navigate('/results', {
          state: {
            selectedEntity: selectedDatabase,
            selectedTeamId: '',  
            sqlQuery: `SELECT * FROM ${selectedTable} WHERE ${selectedColumn} = ${filterValue}`,
            FilterData: response.data.data || [],
            deletedTeamName: ''
          }
        });
      })
      .catch((error) => {
        console.error('Error fetching filtered record:', error);
      });
    }
  };

  // Fetch all records from the selected table
  const handleFetchAllRecords = () => {
    if (selectedTable) {
      axios.get(`http://localhost:3001/api/${selectedTable}`)
        .then((response) => {
          // Navigate to Results page with all records
          navigate('/results', {
            state: {
              selectedEntity: selectedDatabase,
              sqlQuery: `SELECT * FROM ${selectedTable}`,
              FilterData: response.data.data || []
            }
          });
        })
        .catch((error) => {
          console.error('Error fetching all records:', error);
        });
    } else {
      alert('Please select a table first.');
    }
  };

  return (
    <div className="container">
      <HeaderPromptBuilderPage className="header" />

      <div className="title">
        <h1>Select From Database</h1>
      </div>

      {/* Dropdown for selecting DB */}
      <h3>Select Database</h3>
      <select onChange={handleDatabaseChange} value={selectedDatabase}>
        <option value="">--Select Database--</option>
        {databases.map((db) => (
          <option key={db} value={db}>{db}</option>
        ))}
      </select>

      {/* Dropdown for selecting table */}
      <h3>Select Table</h3>
      <select onChange={handleTableChange} value={selectedTable} disabled={!selectedDatabase}>
        <option value="">--Select Table--</option>
        {tables.map((table) => (
          <option key={table} value={table}>{table}</option>
        ))}
      </select>

      {/* Dropdown for selecting column */}
      <h3>Select Column</h3>
      <select
        onChange={handleColumnChange}
        value={selectedColumn}
        disabled={!columns.length}
      >
        <option value="">--Select Column--</option>
        {columns.map((column) => (
          <option key={column} value={column}>
            {column}
          </option>
        ))}
      </select>

      {/* Dropdown for filitering */}
      <h3>Select Filter Value</h3>
      <select
        onChange={handleFilterChange}
        value={filterValue}
        disabled={!columnValues.length}
      >
        <option value="">--Select Value--</option>
        {columnValues.map((value, index) => (
          <option key={index} value={value}>{value}</option>
        ))}
      </select>

      <button onClick={handleFilter} disabled={!selectedColumn || !filterValue || !selectedTable}>
        Fetch by Filter
      </button>

       {/* Button to fetch all records */}
       <button onClick={handleFetchAllRecords} disabled={!selectedTable}>
        Fetch All Records
      </button>

      {/* Display data as json */}
      {recordData && (
        <div className="record-data">
          <h3>Record Details</h3>
          <pre>{JSON.stringify(recordData, null, 2)}</pre>
        </div>
      )}

      <FooterPromptBuilderPage className="footer" />
    </div>
  );
};

export default PromptSelect;
