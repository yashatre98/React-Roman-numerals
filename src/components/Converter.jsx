
import React, { useState } from 'react';
import axios from 'axios';
import { FaSun, FaMoon } from 'react-icons/fa';
import '../assets/styles.css';

const Converter = ({darkMode, setDarkMode}) => {
    const [number, setNumber] = useState('');
    const [result, setResult] = useState('');
    const [error, setError] = useState('');

    // Toggle Dark/Light Mode
    const toggleMode = () => setDarkMode(!darkMode);

    // Handle API call
    const handleConvert = async () => {
        setError('');
        setResult('');
        try {
            const response = await axios.get(`http://localhost:3000/romannumeral?query=${number}`);
            setResult(response.data.output);
        } catch (err) {
            setError(err.response ? err.response.data : 'Error connecting to server');
        }
    };

    return (
        <div className={`container ${darkMode ? 'dark' : 'light'}`}>
            <div className="toggle-wrapper">
                <div
                    className={`toggle-container ${darkMode ? 'dark' : 'light'}`}
                    onClick={toggleMode}
                >
                    <div className={`toggle-circle ${darkMode ? 'move-right' : ''}`}>
                        {darkMode ? <FaMoon size={18} color='white'/> : <FaSun size={18} color='yellow' />}
                    </div>
                </div>
            </div>

            <h1>Roman numeral converter</h1>
            <label>Enter a number:</label>
            <input
                type="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="Enter a number (1-3999)"
            />
            <button onClick={handleConvert}>Convert to roman numeral</button>
            {result && <h2>Roman numeral: {result}</h2>}
            {error && <h3 className="error">{error}</h3>}
        </div>
    );
};

export default Converter;