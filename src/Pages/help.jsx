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
        
        <section className="help-section">
          <h2>What is QueryMatic?</h2>
          <p>QueryMatic is a tool designed for non-technical users to easily interact with databases. It allows users to perform database queries without needing to write complex SQL syntax. This tool is particularly useful in fields like sports analytics and finance, where quick and accurate data queries are essential for decision-making.</p>
        </section>

        <section className="help-section">
          <h2>How do I use QueryMatic?</h2>
          <p>After logging in, you'll be presented with a simple, beginner-level interface that asks you a series of questions about the data you want to query. Based on your responses, we build the SQL query for you. You'll interact with dropdown menus to select tables, columns, and conditions for your query.</p>
        </section>

        <section className="help-section">
          <h2>What are the different features?</h2>
          <ul>
            <li><strong>New Query:</strong> Create a new query by answering a series of questions.</li>
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

            <dt>Condition</dt>
            <dd>Criteria used to filter data (e.g., showing only rows where the price is greater than $100).</dd>
          </dl>
        </section>

        <section className="help-section">
          <h2>FAQ</h2>
          <ul>
            <li><strong>Q:</strong> What if I don’t understand a term on the page?</li>
            <li><strong>A:</strong> You can always come back to this Help page to get explanations on various terms used throughout the app.</li>
            <li><strong>Q:</strong> How do I know if my query is working?</li>
            <li><strong>A:</strong> The app will provide feedback if your query is valid or if there’s an error.</li>
          </ul>
        </section>
      </div>
      <FooterSurveyPage className="footer" />
    </div>
  );
};

export default Help;
