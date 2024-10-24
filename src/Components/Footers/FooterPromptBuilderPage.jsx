import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FooterPromptBuilderPage = () => {
    const navigate = useNavigate();

    const navSurvey = () => {
            navigate('/survey');
       
    };

    const navResults = () => {
        navigate('/results');
    }


    return (
      <div className = "PromptBuilder Footer">
        <button type = "Survey" onClick= {navSurvey}>Survey</button>
        <button type = "Results" onClick = {navResults}>Results</button>
      </div>
      
    );
  };
  
  export default FooterPromptBuilderPage;