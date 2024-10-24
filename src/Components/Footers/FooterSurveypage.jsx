import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FooterStyles/SurveyFooterStyle.css';

const FooterLoginPage = () => {
    const navigate = useNavigate();

    const navPromptBuilder = () => {
            navigate('/promptbuilder');
       
    };

    const navResults = () => {
        navigate('/results');
    }


    return (
      <div className = "SurveyFooter">
        <button type = "PromptBuilder" onClick= {navPromptBuilder}>Prompt Builder</button>
        <button type = "Results" onClick = {navResults}>Results</button>
      </div>
      
    );
  };
  
  export default FooterLoginPage;