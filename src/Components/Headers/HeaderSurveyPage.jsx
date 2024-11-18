import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HeaderStyles/SurveyHeaderStyle.css';

const HeaderSurveyPage = () => {
    const navigate = useNavigate();

    const goToHelp = () => {
      navigate('/help');
    }

    const newQuery = () => {
        navigate('/survey');
    }

    const handleSignOut = () => {
      navigate('/');
 
};


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
  
  export default HeaderSurveyPage;


/*
const HeaderLoginPage= () =>  {
    return (
    <header>
        <h1>Welcome to QueryMatic!</h1>
    </header>
    );

};

export default HeaderLoginPage;
*/