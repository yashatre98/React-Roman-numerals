/*
    This is the main component of the application. It contains the manual converter and the spectrum converter components.
    It also contains the initial value setting logic for toggling between dark and light mode.
*/

import React, { useState, useEffect } from 'react';
import Converter from './components/manualConverter';
import './App.css';
import SpectrumConverter from './components/spectrumConverter';
import log from '../logger';

// Main App component
function App() {
    // state for dark mode
    log.info('App component initialized');
    const [darkMode, setDarkMode] = useState(false);
    console.log('Current darkMode state:', darkMode);
    useEffect(() => {
      log.info(`Theme initialized (manual panel) as: ${darkMode ? 'dark' : 'light'}`);
  }, []);
  
    // Render the main app container
    return (
      <div className={`app-container ${darkMode ? 'dark' : 'light'}`} role='main'>
        <div className='split-container'>
          {/* darkMode has been passed as a Prop */}
          
          <div className={`split-panel  ${darkMode ? 'dark' : 'light'}`} role='manual-converter'>
                <Converter darkMode={darkMode} setDarkMode={setDarkMode}/>
          </div>
         
          <div className=" split-panel spectrum-panel" role='spectrum-converter'>
                <SpectrumConverter />
          </div>
          </div>
      </div>
);
};

export default App;