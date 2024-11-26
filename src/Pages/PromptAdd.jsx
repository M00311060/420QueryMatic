import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FooterPromptBuilderPage from '../Components/Footers/FooterPromptBuilderPage';
import HeaderPromptBuilderPage from '../Components/Headers/HeaderPromptBuilderPage';
import './PagesStyle/PromptBuilder.css';

const PromptAdd = () => {
  const [databases, setDatabases] = useState([]);
  const [selectedDatabase, setSelectedDatabase] = useState('');
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState('');
  const [columns, setColumns] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [recordId, setRecordId] = useState('');
  const [recordData, setRecordData] = useState(null);
  const [formData, setFormData] = useState({}); // For storing form input data
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
        // Initialize formData with empty values for each column
        const initialData = response.data.columns.reduce((acc, column) => {
          acc[column] = '';
          return acc;
        }, {});
        setFormData(initialData);
      })
      .catch((error) => {
        console.error('Error fetching columns:', error);
      });
  };

  const handleColumnChange = (e) => {
    setSelectedColumn(e.target.value);
  };

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission to add a new record
  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!selectedTable) {
      alert('Please select a table.');
      return;
    }
  
    // Send the POST request to add the new record
    axios.post(`http://localhost:3001/api/${selectedTable}`, formData)
      .then((response) => {
        alert(`Record added successfully! ID: ${response.data.id}`);
        setRecordId(response.data.id);
  
        // Navigate to Results page and pass the form data or the newly added record details
        navigate('/results', {
          state: {
            selectedEntity: selectedTable,
            selectedTeamId: response.data.id, // Pass the new record ID
            sqlQuery: `INSERT INTO ${selectedTable} (${Object.keys(formData).join(', ')}) VALUES (${Object.values(formData).map(val => `'${val}'`).join(', ')})`,
            deletedItem: null,
            FilterData: [response.data]  // Pass the newly created record as FilterData
          }
        });
      })
      .catch((error) => {
        console.error('Error adding record:', error);
        alert('Failed to add record.');
      });
  };
  
  return (
    <div className="prompt-add-page">
      <HeaderPromptBuilderPage />
      
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="database">Select Database:</label>
          <select id="database" value={selectedDatabase} onChange={handleDatabaseChange}>
            <option value="">--Select Database--</option>
            {databases.map((database) => (
              <option key={database} value={database}>{database}</option>
            ))}
          </select>

          <label htmlFor="table">Select Table:</label>
          <select id="table" value={selectedTable} onChange={handleTableChange}>
            <option value="">--Select Table--</option>
            {tables.map((table) => (
              <option key={table} value={table}>{table}</option>
            ))}
          </select>

          <div className="form-fields">
            {columns.map((column) => (
              <div key={column}>
                <label htmlFor={column}>{column}:</label>
                <input
                  type="text"
                  id={column}
                  name={column}
                  value={formData[column] || ''}
                  onChange={handleInputChange}
                />
              </div>
            ))}
          </div>

          <button type="submit">Add Record</button>
        </form>
      </div>

      <FooterPromptBuilderPage />
    </div>
  );
};

export default PromptAdd;
