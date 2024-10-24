import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HeaderPromptBuilderPage = () => {
    const navigate = useNavigate();

    const handleSignOut = () => {
            navigate('/');
       
    };

    const newQuery = () => {
        navigate('/survey');
    }


    return (
      <div className = "PromptBuilder Header">
        <h1> QueryMatic</h1>
        <h1>Prompt Builder Page</h1>
        <button type = "New Query" onClick= {newQuery}>New Query</button>
        <button type = "Sign Out" onClick = {handleSignOut}>Sign Out</button>
      </div>
      
    );
  };
  
  export default HeaderPromptBuilderPage;
