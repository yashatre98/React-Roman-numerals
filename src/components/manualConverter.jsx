/*
    This component is responsible for rendering the main UI of the application.
    It contains the input field, convert button, and the result display.
    It also contains the logic for handling user input, API calls, and displaying the result.
    It also contains the logic for toggling between dark and light mode.
*/

import React, { useState } from 'react';
import axios from 'axios';
import { FaSun, FaMoon } from 'react-icons/fa';
import '../assets/manualConverter.css';
import log from '../../logger';

const Converter = ({darkMode, setDarkMode}) => {
    const [number, setNumber] = useState('');
    const [result, setResult] = useState('');
    const [error, setError] = useState('');
    const [prevNumber, setPrevNumber] = useState('');
    const [prevResult, setPrevResult] = useState('');

    // Toggle Dark/Light Mode
    const toggleMode = () => {
        const newMode = !darkMode; // Determine the new mode
        setDarkMode(newMode);
        log.info(`Manual theme toggle: Switched to ${newMode ? 'dark' : 'light'} mode.`);
    };
    // Handle API call
    const handleConvert = async () => {
        log.debug('Convert button clicked');
        setError('');
        setResult('');
        
        if (!number) {
            log.error('Empty input field');
            setError('Please enter a number.');
            return;
        }
        if(number===prevNumber){
            log.debug('Same number as previous input');
            setResult(prevResult);
            return;
        }
          
        
        try {
            log.info(`Fetching result for number: ${number}`);
            setPrevNumber(number);
            const response = await axios.get(`http://localhost:3000/romannumeral?query=${number}`);
            log.info('good API response received');
            setResult(response.data.output);
            setPrevResult(response.data.output);
        } catch (err) {
            log.error('API Error');
            setError(err.response ? err.response.data : 'Error connecting to server');
        }
    };
    // Handle input change
    const handleInputChange = (e) => {
        const value = e.target.value;
    
        // Allow only numbers between 1 and 3999
        if (/^\d*$/.test(value)) { // Check if it's a number
            const num = parseInt(value, 10);
            if (value===''||(num >= 1 && num <= 3999)) { // Allow valid range or empty
                setNumber(value); // Update state only if valid
            }
            else {
                e.target.value = ''; // Clear input if invalid
                console.log('Invalid input: Number out of range'); }// Add logging
            
        }else {
            e.target.value = ''; // Clear input if invalid
            console.log('Invalid input: Non-numeric characters detected'); // Add logging
        }
    };

    return (
        <div className={`container ${darkMode ? 'dark' : 'light'}`}>
            <div className="tooltip-container">
        <div className='panel-facts'>
            Panel made with HTML, CSS. Component libraries were not used.
            Theme selected manually using the toggle button.
        </div>
    </div>
            <div className="toggle-wrapper">
                <div
                    className={`toggle-container ${darkMode ? 'dark' : 'light'}`}
                    onClick={toggleMode}
                    aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
                    role="button"
                >
                    <div className={`toggle-circle ${darkMode ? 'move-right' : ''}`}>
                        {darkMode ? <FaMoon size={18} color='white'/> : <FaSun size={18} color='yellow' />}
                    </div>
                </div>
            </div>

            <h1>Roman numeral converter</h1>
            <label>Enter a number:</label>
            <input
                // type="number"
                // value={number}
                onChange={handleInputChange}
                placeholder="Enter a number [1-3999]"
            />
            <button onClick={handleConvert}>
                Convert to roman numeral.
            </button>
            {result && <h2 data-testid="result">Roman numeral: {result}</h2>}
            {error && <h3 className="error">{error}</h3>}
        </div>
    );
};

export default Converter;