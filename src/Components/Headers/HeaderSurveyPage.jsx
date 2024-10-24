import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HeaderStyles/SurveyHeaderStyle.css';

const HeaderSurveyPage = () => {
    const navigate = useNavigate();

    const handleSignOut = () => {
            navigate('/');
       
    };

    const newQuery = () => {
        navigate('/survey');
    }


    return (
      <div className = "SurveyHeader">
        <h1> QueryMatic</h1>
        <h1>Survey Page</h1>
        <button type = "New Query" onClick= {newQuery}>New Query</button>
        <button type = "Sign Out" onClick = {handleSignOut}>Sign Out</button>
      </div>
      
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