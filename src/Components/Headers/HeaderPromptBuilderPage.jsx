import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HeaderPromptBuilderPage = () => {
    const navigate = useNavigate();

    const goToHelp = () => {
      navigate('/help');
    }

    const handleSignOut = () => {
            navigate('/');
       
    };

    const newQuery = () => {
        navigate('/survey');
    }

    return (

      <nav className="navbar background">
          <ul className="nav-list">
              <div className="logo">
                  <img src="../../../public/QueryMaticLogo.png" alt="QueryMatic Logo" />
              </div>
              <li>
                  <a href="/help" onClick={goToHelp}>Help/Info</a>
              </li>
              <li>
                  <a href="/survey" onClick={newQuery}>New Query</a>
              </li>
          </ul>
          <div className="rightNav">
              <a href="/" onClick={handleSignOut}>Sign Out</a>
          </div>
      </nav>
  );
};

export default HeaderPromptBuilderPage;

    /*
    return (
      <div className = "PromptBuilder Header">
        <h1> QueryMatic</h1>
        <h1>Prompt Builder Page</h1>
        <button type = "New Query" onClick= {newQuery}>New Query</button>
        <button type = "Sign Out" onClick = {handleSignOut}>Sign Out</button>
      </div>
      
    );
  }; */
  

