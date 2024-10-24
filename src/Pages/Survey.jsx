import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderSurveyPage from '../Components/Headers/HeaderSurveyPage';
import FooterSurveyPage from '../Components/Footers/FooterSurveypage';
import './PagesStyle/SurveyStyle.css';

const Survey = () => {
    const navigate = useNavigate();

    const handleSignOut = () => {
            navigate('/');
       
    };


    return (
      <div className ="container">
        <HeaderSurveyPage className = "header"/>
        <h3>Sample Question 1</h3>
        <h3>Sample Question 2</h3>
        <h3>Sample Question 3</h3>
        <h3>Sample Question 4</h3>
        <h3>Sample Question 5</h3>
        <h3>Sample Question 6</h3>
        <FooterSurveyPage className = "footer"/>
      </div>
      
      
    );
  };
  
  export default Survey;