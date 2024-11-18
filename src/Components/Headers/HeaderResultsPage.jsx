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


    return (
      <div className = "SurveyHeader">
        <div className="logo">
                <img src={QuerymaticLogo} alt="QueryMatic Logo" />
        </div>
        <h1>Results Page</h1>
        <button type = "New Query" onClick= {newQuery}>New Query</button>
        <button type = "Sign Out" onClick = {handleSignOut}>Sign Out</button>
      </div>
      
    );
  };
  
  export default HeaderResultsPage;