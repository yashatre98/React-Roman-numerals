import React, { useState } from 'react';
import Converter from './components/Converter';
import './App.css';

function App() {
    // state for dark mode
    const [darkMode, setDarkMode] = useState(false);
    return (
      <div className={`app-container ${darkMode ? 'dark' : 'light'}`}>
          {/* darkMode has been passed as a Prop */}
          <Converter darkMode={darkMode} setDarkMode={setDarkMode}/>
      </div>
);
};

export default App;