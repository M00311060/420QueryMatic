import { useState } from 'react';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Help from './Pages/help';
import Survey from './Pages/Survey';
import PromptSelect from './Pages/PromptSelect';
import PromptAdd from './Pages/PromptAdd';
import PromptDelete from './Pages/PromptDelete';
import PromptUpdate from './Pages/PromptUpdate';
import Results from './Pages/Results';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/help" element={<Help />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/promptselect" element={<PromptSelect />} />
        <Route path="/promptadd" element={<PromptAdd />} />
        <Route path="/promptdelete" element={<PromptDelete />} />
        <Route path="/promptUpdate" element={<PromptUpdate />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
};

export default App;
