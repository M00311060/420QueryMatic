import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FooterStyles/HelpFooterStyle.css'; 

const FooterHelpPage = () => {
    const navigate = useNavigate();

    const navPromptBuilder = () => {
        navigate('/promptbuilder');
    };

    const navResults = () => {
        navigate('/results');
    };

    return (
        <footer className="footer">
            <div className="HelpFooter">
                <button type="button" className="footer-btn" onClick={navPromptBuilder}>Prompt Builder</button>
                <button type="button" className="footer-btn" onClick={navResults}>Results</button>
            </div>
        </footer>
    );
};

export default FooterHelpPage;

