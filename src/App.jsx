import React, { useState, useEffect } from 'react';
import Converter from './components/Converter';
import './App.css';
import SpectrumConverter from './components/SpectrumConverter';
import log from '../logger';

function App() {
    // state for dark mode
    log.info('App component initialized');
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
      log.info(`Theme initialized (manual panel) as: ${darkMode ? 'dark' : 'light'}`);
  }, []);


    return (
      <div className={`app-container ${darkMode ? 'dark' : 'light'}`}>
        <div className='split-container'>
          {/* darkMode has been passed as a Prop */}
          
          <div className={`split-panel  ${darkMode ? 'dark' : 'light'}`}>
                <Converter darkMode={darkMode} setDarkMode={setDarkMode}/>
          </div>
         
          <div className=" split-panel spectrum-panel">
                <SpectrumConverter />
          </div>
          </div>
      </div>
);
};

export default App;