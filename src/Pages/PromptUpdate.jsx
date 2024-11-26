import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FooterPromptBuilderPage from '../Components/Footers/FooterPromptBuilderPage';
import HeaderPromptBuilderPage from '../Components/Headers/HeaderPromptBuilderPage';
import './PagesStyle/PromptBuilder.css';

const UpdateRecordPage = () => {
  // State variables to store databases, tables, columns, and user inputs
  const [databases, setDatabases] = useState([]);
  const [selectedDatabase, setSelectedDatabase] = useState('');
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState('');
  const [columns, setColumns] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState('');
  const [columnValues, setColumnValues] = useState([]);
  const [filterValue, setFilterValue] = useState('');
  const [selectedRecord, setSelectedRecord] = useState(null); // For storing selected record
  const [updatedRecord, setUpdatedRecord] = useState({}); // For storing updated record values
  const [isSubmitting, setIsSubmitting] = useState(false); // To handle form submission state
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

  // Fetch matching records for the selected column value
  const handleFilter = () => {
    if (selectedColumn && filterValue && selectedTable) {
      axios.get(`http://localhost:3001/api/${selectedTable}/filter`, {
        params: {
          column: selectedColumn,
          value: filterValue
        }
      })
        .then((response) => {
          // Ensure the first record is selected (using `id`)
          const filteredRecord = response.data.data[0];
          if (filteredRecord) {
            setSelectedRecord(filteredRecord); // Set the selected record
            setUpdatedRecord(filteredRecord);  // Set initial values for updating
          }
        })
        .catch((error) => {
          console.error('Error fetching filtered record:', error);
        });
    }
  };

  // Update record data and handle form changes
  const handleRecordChange = (e) => {
    const { name, value } = e.target;
    setUpdatedRecord((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle record update submission
  const handleUpdateSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    setIsSubmitting(true); // Disable the form while submitting
    console.log('Updating record:', selectedRecord.id, updatedRecord); // Check values
    if (selectedRecord && updatedRecord) {
      // Ensure the id column is passed correctly for the update
      axios.put(`http://localhost:3001/api/${selectedTable}/${selectedRecord.id}`, updatedRecord)
        .then((response) => {
          navigate('/results', {
            state: {
              selectedEntity: selectedTable,
              selectedTeamId: selectedRecord.id,
              sqlQuery: `UPDATE ${selectedTable} SET ${Object.keys(updatedRecord).map(key => `${key} = ?`).join(', ')} WHERE id = ${selectedRecord.id}`,
              deletedItem: null,
              FilterData: [updatedRecord]
            }
          });
        })
        .catch((error) => {
          console.error('Error updating record:', error);
        })
        .finally(() => {
          setIsSubmitting(false); // Re-enable the button once the process is done
        });
    }
  };

  return (
    <div className="container">
      <HeaderPromptBuilderPage className="header" />

      <div className="title">
        <h1>Update Record</h1>
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
      <select onChange={handleColumnChange} value={selectedColumn} disabled={!columns.length}>
        <option value="">--Select Column--</option>
        {columns.map((column) => (
          <option key={column} value={column}>{column}</option>
        ))}
      </select>

      {/* Dropdown for filtering records */}
      <h3>Select Filter Value</h3>
      <select onChange={handleFilterChange} value={filterValue} disabled={!columnValues.length}>
        <option value="">--Select Value--</option>
        {columnValues.map((value, index) => (
          <option key={index} value={value}>{value}</option>
        ))}
      </select>

      <button onClick={handleFilter} disabled={!selectedColumn || !filterValue || !selectedTable}>
        Fetch Record to Update
      </button>

      {/* Display selected record for editing */}
      {selectedRecord && (
        <div>
          <h3>Edit Record</h3>
          <form onSubmit={handleUpdateSubmit}>
            {Object.keys(selectedRecord).map((key) => {
              if (key === 'id') return null; // Don't display the id field in the form
              return (
                <div key={key}>
                  <label>{key}</label>
                  <input
                    type="text"
                    name={key}
                    value={updatedRecord[key] || selectedRecord[key]}
                    onChange={handleRecordChange}
                  />
                </div>
              );
            })}
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Updating...' : 'Update Record'}
            </button>
          </form>
        </div>
      )}

      <FooterPromptBuilderPage className="footer" />
    </div>
  );
};

export default UpdateRecordPage;
