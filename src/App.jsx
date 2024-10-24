import { useState } from 'react';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Survey from './Pages/Survey';
import PromptBuilder from './Pages/PromptBuilder';
import Results from './Pages/Results';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/promptbuilder" element={<PromptBuilder />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
};

export default App;
