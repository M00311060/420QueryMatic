import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderSurveyPage from '../Components/Headers/HeaderSurveyPage';
import FooterSurveyPage from '../Components/Footers/FooterSurveyPage';
import './PagesStyle/SurveyStyle.css';

const Survey = () => {
    const navigate = useNavigate();

    const handleSignOut = () => {
            navigate('/');
       
    };

    const selectAll = () => {
      navigate('/promptSelect');
    }

    const addEntry = () => {
      navigate('/promptAdd');
    }

    const deleteEntry = () => {
      navigate('/promptDelete');
    }

    const editEntry = () => {
      navigate('/promptUpdate');
    }    


    return (
      <div className ="container">
        <HeaderSurveyPage className = "header"/>

        <br />

          <div className ="title">
            <h1>Survey Page</h1>
          </div>
        
        <br />
        <button type = "SelectAll" onClick= {selectAll}>See Data</button>
        <br />
        <br />
        <button type = "addEntry" onClick= {addEntry}>Add Data</button>
        <br />
        <br />
        <button type = "deleteEntry" onClick= {deleteEntry}>Delete Data</button>
        <br />
        <br />
        <button type = "editEntry" onClick= {editEntry}>Edit Data</button>
        <FooterSurveyPage className = "footer"/>
      </div>    
    );
  };
  
  export default Survey;