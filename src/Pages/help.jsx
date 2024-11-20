import React from 'react';
import HeaderSurveyPage from '../Components/Headers/HeaderHelpPage';
import FooterSurveyPage from '../Components/Footers/FooterHelpPage';
import './PagesStyle/HelpStyle.css'; 

const Help = () => {
  return (
    <div className="container">
      <HeaderSurveyPage className="header" />
      <div className="help-content">
        <h1>Welcome to the Help/Info Page</h1>
        <br />
        
        <section className="help-section">
          <h2>What is QueryMatic?</h2>
          <p>QueryMatic is a tool designed for non-technical users to easily interact with databases. It allows users to perform database queries without needing to write complex SQL syntax. This tool is particularly useful in fields like sports analytics and finance, where quick and accurate data queries are essential for decision-making.</p>
        </section>

        <section className="help-section">
          <h2>How do I use QueryMatic?</h2>
          <p>After logging in, you'll be presented with a simple, beginner-level interface that asks you a series of questions about the data you want to query. Based on your responses, we build the SQL query for you. You'll interact with dropdown menus to select tables, columns, and conditions for your query.</p>
        </section>

        <section className="help-section">
          <h2>What are the different features/pages?</h2>
          <ul>
            <li><strong>New Query:</strong> Create a new query by answering a series of questions. Decide what CRUD operation you want to utilize.</li>
            <li><strong>Prompt Builder:</strong> A guided interface in this app that helps users build SQL queries by selecting options like tables, columns, and conditions.</li>
            <li><strong>Help/Info:</strong> Access this page for information about using the app and understanding the terms.</li>
            <li><strong>Sign Out:</strong> Sign out of the application when you're done.</li>
          </ul>
        </section>

        <section className="help-section">
          <h2>Key Terms</h2>
          <dl>
            <dt>SQL</dt>
            <dd>Structured Query Language, a programming language used to manage data in a relational database.</dd>

            <dt>Table</dt>
            <dd>A collection of data organized into rows and columns within a database.</dd>

            <dt>Column</dt>
            <dd>A vertical set of values of a particular type within a table (e.g., a list of names, dates, or prices).</dd>

            <dt>Row</dt>
            <dd>A single record in a table, containing values for each column.</dd>

            <dt>Condition</dt>
            <dd>Criteria used to filter data (e.g., showing only rows where the price is greater than $100).</dd>

            <dt>Query</dt>
            <dd>A request to access or manipulate data in a database (e.g., retrieving specific rows or updating a table).</dd>

            <dt>Database</dt>
            <dd>An organized collection of data that can be accessed and managed programmatically.</dd>

            <dt>Primary Key</dt>
            <dd>A unique identifier for each row in a table, ensuring that no two rows are identical.</dd>

            <dt>Foreign Key</dt>
            <dd>A column that creates a relationship between two tables by referencing the primary key of another table.</dd>

            <dt>Data Type</dt>
            <dd>The kind of value a column can hold, such as text, numbers, or dates.</dd>

            <dt>Join</dt>
            <dd>A database operation that combines rows from two or more tables based on a related column.</dd>

            <dt>Filter</dt>
            <dd>A way to narrow down query results by applying specific conditions or criteria.</dd>

            <dt>Syntax Error</dt>
            <dd>An error that occurs when a query is written incorrectly and does not follow SQL rules.</dd>

            <dt>Authentication</dt>
            <dd>The process of verifying a user’s identity before allowing access to the app.</dd>

            <dt>Result Set</dt>
            <dd>The output of a query, usually displayed as rows and columns in a table format.</dd>

            <dt>Schema</dt>
            <dd>The structure of a database, including tables, columns, and relationships.</dd>

            <dt>CRUD</dt>
            <dd>An acronym for Create, Read, Update, Delete – the four basic operations you can perform on database data.</dd>

            <dt>Frontend</dt>
            <dd>The part of the app that users interact with, including buttons, forms, and displays.</dd>

            <dt>Backend</dt>
            <dd>The part of the app that handles data processing, query execution, and communication with the database.</dd>

          </dl>
        </section>

        <section className="help-section">
          <h2>FAQ</h2>
          <ul>
            <li><strong>Q:</strong> What if I don’t understand a term on the page?</li>
            <li><strong>A:</strong> You can always come back to this Help page to get explanations on various terms used throughout the app.</li>
            <li><strong>Q:</strong> How do I know if my query is working?</li>
            <li><strong>A:</strong> The app will provide feedback if your query is valid or if there’s an error.</li>
            <li><strong>Q:</strong> What do I do if I messed up and want to start over?</li>
            <li><strong>A:</strong> You can click the New Query button so that you can rebuild your desired query.</li>
          </ul>
        </section>
      </div>
      <FooterSurveyPage className="footer" />
    </div>
  );
};

export default Help;
