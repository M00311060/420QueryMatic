/*
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderLoginPage from '../Components/Headers/HeaderLoginPage';
import FooterLoginpage from '../Components/Footers/FooterLoginPage';
import './PagesStyle/LoginStyle.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const universalPassword = 'QueryMatic24';
    const murrayEmail = /^[a-zA-Z0-9._%+-]+@murraystate\.edu$/

    const handleLogin = () => {
        if (murrayEmail.test(email.toLowerCase()) && password === universalPassword) {
            navigate('/survey');
        } else {
            alert('Error: Invalid Credentials')
        }
    };

    return (
        <div> 
            <HeaderLoginPage />
            <img src ='src\assets\QuerymaticLogo.jpeg'
                        alt = "QueryMatic Logo" />
            <div className = "EmailTextBox">
                <label>Email:</label>
                <input type ="email" value = {email} onChange = {(e) => setEmail(e.target.value)} />
            </div>

            <div className = "PasswordTextBox">
                <label>Password:</label>
                <input type = "password" value = {password} onChange = {(e) => setPassword(e.target.value)} />
            </div>

            <button type = "submit" onClick = {handleLogin}>Login</button>
            <FooterLoginpage />

        </div>
    );
}

export default Login
*/


import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderLoginPage from '../Components/Headers/HeaderLoginPage';
import FooterLoginpage from '../Components/Footers/FooterLoginPage';
import './PagesStyle/LoginStyle.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const universalPassword = 'QueryMatic24';
    const murrayEmail = /^[a-zA-Z0-9._%+-]+@murraystate\.edu$/;

    const handleLogin = () => {
        if (murrayEmail.test(email.toLowerCase()) && password === universalPassword) {
            navigate('/survey');
        } else {
            alert('Error: Invalid Credentials');
        }
    };

    return (
        <div className="login-page">
            <HeaderLoginPage />
            <img
                src='src/assets/QuerymaticLogo.jpeg'
                alt="QueryMatic Logo"
            />
            <div className="EmailTextBox">
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="PasswordTextBox">
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <button type="submit" onClick={handleLogin}>Login</button>
            <FooterLoginpage />
        </div>
    );
};

export default Login;
