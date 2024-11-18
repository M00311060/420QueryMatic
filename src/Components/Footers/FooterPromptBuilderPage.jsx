import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FooterStyles/PromptBuilderFooterStyle.css'; // Ensure you have this CSS file setup for your styling

const FooterPromptBuilderPage = () => {
    const navigate = useNavigate();

    const navSurvey = () => {
        navigate('/survey');
    };

    const navResults = () => {
        navigate('/results');
    }

    return (
        <footer className="footer">
            <div className="PromptBuilderFooter">
                <button type="button" className="footer-btn" onClick={navSurvey}>Survey</button>
                <button type="button" className="footer-btn" onClick={navResults}>Results</button>
            </div>
        </footer>
    );
};

export default FooterPromptBuilderPage;
