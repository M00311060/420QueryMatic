import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HeaderStyles/HelpHeaderStyle.css';
import QuerymaticLogo from '../../assets/QuerymaticLogo.jpeg';

const HeaderHelpPage = () => {
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
                    <img src={QuerymaticLogo} alt="QueryMatic Logo" />
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
  
  export default HeaderHelpPage;