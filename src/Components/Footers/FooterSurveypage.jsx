/*import React from 'react';
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
  */

  import React from 'react';
  import { useNavigate } from 'react-router-dom';
  import './FooterStyles/SurveyFooterStyle.css';
  
  const FooterLoginPage = () => {
      const navigate = useNavigate();
  
      const navPromptBuilder = () => {
          navigate('/promptbuilder');
      };
  
      const navResults = () => {
          navigate('/results');
      };
  
      return (
          <footer className="footer">
              <ul className="footer-links">
                  <li>
                      <button className="footer-btn" onClick={navPromptBuilder}>
                          Prompt Builder
                      </button>
                  </li>
                  <li>
                      <button className="footer-btn" onClick={navResults}>
                          Results
                      </button>
                  </li>
              </ul>
          </footer>
      );
  };
  
  export default FooterLoginPage;
  