
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FooterStyles/SurveyFooterStyle.css';
  
  const FooterSurveyPage = () => {
      const navigate = useNavigate();
  
      const navResults = () => {
          navigate('/results');
      };
  
      return (
          <footer className="footer">
              <ul className="footer-links">
                  <li>
                      <button className="footer-btn" onClick={navResults}>
                          Results
                      </button>
                  </li>
              </ul>
          </footer>
      );
  };
  
export default FooterSurveyPage;
  