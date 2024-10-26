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
        <p>I would like to see the data in the table.</p><button type = "SelectAll" onClick= {selectAll}>Select</button>
        <p>I would like to add data to the table.</p><button type = "addEntry" onClick= {addEntry}>Select</button>
        <p>I would like to delete from the table.</p><button type = "deleteEntry" onClick= {deleteEntry}>Select</button>
        <p>I would like to edit data in the table.</p><button type = "editEntry" onClick= {editEntry}>Select</button>
        <FooterSurveyPage className = "footer"/>
      </div>    
    );
  };
  
  export default Survey;