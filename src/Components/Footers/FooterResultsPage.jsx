import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FooterResultsPage = () => {
    const navigate = useNavigate();

    const navPromptSelect = () => {
        navigate('/promptselect');
    }

    const navPromptAdd = () => {
        navigate('/promptadd');
    }

    const navPromptDelete = () => {
        navigate('/promptdelete');
    }

    const navPromptEdit = () => {
        navigate('/promptUpdate');
    }


    return (
      <footer className="footer">
          <ul className="footer-links">
              <li>
                  <button className="footer-btn" onClick={navPromptSelect}>
                    Prompt Select
                  </button>
              </li>
              <li>
                  <button className="footer-btn" onClick={navPromptAdd}>
                    Prompt Add
                  </button>
              </li>
              <li>
                  <button className="footer-btn" onClick={navPromptDelete}>
                    Prompt Delete
                  </button>
              </li>
              <li>
                  <button className="footer-btn" onClick={navPromptEdit}>
                    Prompt Edit
                  </button>
              </li>
          </ul>
      </footer>
      
    );
  };

  export default FooterResultsPage;