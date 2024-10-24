import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FooterResultsPage = () => {
    const navigate = useNavigate();

    const navSurvey = () => {
            navigate('/survey');
       
    };

    const navPromptBuilder = () => {
        navigate('/promptbuilder');
    }


    return (
      <div className = "SurveyFooter">
        <button type = "Survey" onClick= {navSurvey}>Survey</button>
        <button type = "Prompt Builder" onClick = {navPromptBuilder}>PromptBuilder</button>
      </div>
      
    );
  };
  
  export default FooterResultsPage;