import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FooterPromptBuilderPage from '../Components/Footers/FooterPromptBuilderPage';
import HeaderPromptBuilderPage from '../Components/Headers/HeaderPromptBuilderPage';
import './PagesStyle/PromptBuilder.css';

const PromptSelect = () => {
  const [databases, setDatabases] = useState([]);
  const [selectedDatabase, setSelectedDatabase] = useState('');
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState('');
  const [columns, setColumns] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [recordId, setRecordId] = useState('');
  const [recordData, setRecordData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the list of available databases
    axios.get('http://localhost:3001/api/databases')
      .then((response) => {
        setDatabases(response.data.databases);
      })
      .catch((error) => {
        console.error('Error fetching databases:', error);
      });
  }, []);

  const handleDatabaseChange = (e) => {
    const selectedDb = e.target.value;
    setSelectedDatabase(selectedDb);

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

  const handleColumnChange = (e) => {
    setSelectedColumn(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterValue(e.target.value);
  };

  const handleRecordIdChange = (e) => {
    setRecordId(e.target.value);
  };

  const handleFetchById = () => {
    if (recordId && selectedTable) {
      // Fetch the record by ID
      axios.get(`http://localhost:3001/api/${selectedTable}/${recordId}`)
        .then((response) => {
          setRecordData(response.data.data);

          // Navigate to Results page with the state
          navigate('/results', {
            state: {
              selectedEntity: selectedDatabase,
              selectedTeamId: recordId,
              sqlQuery: `SELECT * FROM ${selectedTable} WHERE id = ${recordId}`,
              FilterData: response.data.data || [],
              deletedTeamName: ""
            }
          });
        })
        .catch((error) => {
          console.error('Error fetching record by ID:', error);
        });
    }
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
            selectedTeamId: recordId,  // Keep the selectedTeamId in case it's needed
            sqlQuery: `SELECT * FROM ${selectedTable} WHERE ${selectedColumn} = ${filterValue}`,
            FilterData: response.data.data || [],
            deletedTeamName: ""
          }
        });
      })
      .catch((error) => {
        console.error('Error fetching filtered record:', error);
      });
    }
  };

  return (
    <div className="container">
      <HeaderPromptBuilderPage className="header" />

      <div className="title">
        <h1>Select From Database</h1>
      </div>

      <h3>Select Database</h3>
      <select onChange={handleDatabaseChange} value={selectedDatabase}>
        <option value="">--Select Database--</option>
        {databases.map((db) => (
          <option key={db} value={db}>{db}</option>
        ))}
      </select>

      <h3>Select Table</h3>
      <select onChange={handleTableChange} value={selectedTable} disabled={!selectedDatabase}>
        <option value="">--Select Table--</option>
        {tables.map((table) => (
          <option key={table} value={table}>{table}</option>
        ))}
      </select>

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

      <h3>Enter Filter Value</h3>
      <input
        type="text"
        value={filterValue}
        onChange={handleFilterChange}
        placeholder="Enter filter value"
        disabled={!selectedColumn}
      />
      
      <button onClick={handleFilter} disabled={!selectedColumn || !filterValue || !selectedTable}>
        Fetch by Filter
      </button>

      <h3>Enter Record ID</h3>
      <input
        type="number"
        value={recordId}
        onChange={handleRecordIdChange}
        placeholder="Enter ID"
        disabled={!selectedTable}
      />

      <button onClick={handleFetchById} disabled={!recordId || !selectedTable}>
        Fetch by ID
      </button>

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
