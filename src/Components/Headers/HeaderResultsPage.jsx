import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuerymaticLogo from '../../assets/QuerymaticLogo.jpeg';

const HeaderResultsPage = () => {
    const navigate = useNavigate();

    const handleSignOut = () => {
            navigate('/');
       
    };

    const newQuery = () => {
        navigate('/survey');
    }

    const goToHelp = () => {
      navigate('/help');
    }


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
  
  export default HeaderResultsPage;