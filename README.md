# React Roman Numeral Converter


---

## Project Overview

This project is a **Roman Numeral Converter** built with React. It includes two distinct independent implementations:  
1. **Custom Converter Component** - A standard component with a light/dark mode toggle.  
2. **React Spectrum-Based Component** - Utilizes Adobe React Spectrum for theme auto-detection.  

The project also integrates **performance monitoring** using `web-vitals` and logs metrics to a backend server.

---

## Build and Run Instructions

### Prerequisites
- **Express.js API setup** https://github.com/yashatre98/Number-to-Roman.git
- **Node.js** (version 18 or later recommended)  
- **npm** (comes bundled with Node.js)  

### Steps
0. **Backend API Setup**
    ```
    API should be running at localhost:3000 by deafult.
    Move to next step if already done.
    Setup the Express API using this link: 
    https://github.com/yashatre98/Number-to-Roman/blob/main/README.md

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/yashatre98/React-Roman-numerals.git
   cd React-Roman-numerals
2. **Install Dependencies**  
   ```bash
   npm install
3. **Run the local server**  
   ```bash
   npm run dev
3. **Access the application**  
    ```
    Open your browser and navigate to:
   http://localhost:5173

4. **Testing Instructions**
    ```bash
    npm test 
    npm run test:coverage
---

## Engineering and Testing Methodology

### Engineering Approach
- **Component Design:**
  - **`Converter.jsx`** - Implements the primary Roman numeral converter with a toggleable theme button.
  - **`SpectrumConverter.jsx`** - Uses Adobe Spectrum component library for theme-aware rendering without manual toggling.
  - **`Algorithm`** - The converter algorithm maps Roman numerals to their corresponding integer values using a lookup table. It iterates through the input string, compares adjacent symbols, and either adds or subtracts values based on the precedence of symbols. This ensures correct handling of subtractive notations like **"IV" (4)** and **"IX" (9)**.
  - **`Theme Change/Detection:`**
      - **Custom Component (`Converter.jsx`):** Allows users to toggle between light and dark modes using a button. The toggle state is stored in React state, and CSS classes are dynamically updated based on the selected theme. 
      - **Adobe Spectrum Component (`SpectrumConverter.jsx`):** Automatically detects the user's preferred theme settings (dark or light) from the operating system using React Spectrum's built-in theme detection. No manual toggle button is required, providing a seamless user experience.


- **Performance Monitoring:**
  - Implemented in **`vitals.js`** using the **web-vitals** library. Metrics such as **CLS**, **LCP**, **FCP**, and **TTFB** are sent to the backend using **Axios**.
- **Responsiveness:**
  - Both components are styled for optimal viewing on various screen sizes.

### Testing Approach
- **Unit Testing:**
  - **`Converter.test.jsx`** validates the core converter functionality.
    - **Key Test Cases**:
      1. **Rendering Elements**:  
          - Confirms input fields and buttons are present in the DOM.  
      2. **Invalid Input Handling**:  
          - Simulates entering invalid data and verifies the display of error messages.  
      3. **Valid Input Handling**:  
          - Tests conversion of numeric inputs (e.g., `10 → X`) and verifies correct results are displayed.

  - **`SpectrumConverter.test.jsx`** tests the behavior of the Adobe Spectrum-based component.
    - **Key Test Cases**:
      1. **Rendering Elements**:  
          - Confirms the input field and button render correctly in the DOM.  
      2. **Invalid Input Error Handling**:  
          - Simulates invalid input (non-numeric values) and verifies error messages appear dynamically.  
      3. **Valid Input Conversion**:  
          - Simulates valid input (`10`) and checks the result (**"X"**) displayed in the output.  
          - Ensures results dynamically update based on user actions.  
 
- **Automation:**
  - Tests are executed using **Jest** and **React Testing Library**.
---
## Packaging Layout
```
React-Roman-numerals/
├── .vscode/                  # IDE settings  
├── coverage/                 # Test coverage reports  
├── node_modules/             # Dependencies  
├── public/                   # Static assets (favicon, index.html)  
├── src/                      # Main source code  
│   ├── assets/               # Static assets  
│   ├── components/           # React components  
│   │   ├── Converter.jsx             # Custom converter  
│   │   ├── SpectrumConverter.jsx     # Spectrum-based converter  
│   ├── Tests/                 # Test files  
│   │   ├── Converter.test.jsx          # Tests for Converter  
│   │   ├── SpectrumConverter.test.jsx  # Tests for SpectrumConverter  
│   ├── App.css                # App styles  
│   ├── App.jsx                # Root component  
│   ├── index.css              # Global styles  
│   ├── main.jsx               # React entry point  
│   ├── vitals.js              # Logs performance metrics  
├── README.md                  # Project documentation  
├── package.json               # Project metadata  
├── package-lock.json          # Dependency lock file  
|...... Other Config files
```
---
## Dependency Attribution

- ### **Dependencies**
| Dependency                    | Version      | Purpose                                                                 |
|-------------------------------|--------------|-------------------------------------------------------------------------|
| **@adobe/react-spectrum**      | ^3.38.1      | Adobe React Spectrum library for theme-aware components.                |
| **axios**                      | ^1.7.9       | HTTP client for sending performance metrics to the backend.             |
| **bootstrap**                  | ^5.3.3       | Front-end framework for responsive styling.                             |
| **cors**                       | ^2.8.5       | Middleware for enabling Cross-Origin Resource Sharing.                  |
| **loglevel**                   | ^1.9.2       | Lightweight logging library for JavaScript applications.                |
| **react**                      | ^18.3.1      | Core framework for building UI components.                              |
| **react-dom**                  | ^18.3.1      | DOM-specific methods for React components.                              |
| **react-icons**                | ^5.4.0       | Icon library for React components.                                      |
| **web-vitals**                 | ^4.2.4       | Measures core web vitals metrics and sends them to the backend.         |

- ### **DevDependencies**
| Dependency                           | Version      | Purpose                                                                |
|--------------------------------------|--------------|------------------------------------------------------------------------|
| **@babel/core**                       | ^7.26.0      | Babel compiler core for JavaScript and JSX transpilation.               |
| **@babel/preset-env**                 | ^7.26.0      | Babel preset for compiling modern JavaScript.                           |
| **@babel/preset-react**               | ^7.26.3      | Babel preset for compiling React JSX syntax.                            |
| **@eslint/js**                        | ^9.17.0      | Linting JavaScript code with ESLint.                                    |
| **@testing-library/jest-dom**         | ^6.6.3       | Jest matchers for testing DOM nodes.                                    |
| **@testing-library/react**            | ^16.1.0      | Testing utilities for React components.                                 |
| **@testing-library/user-event**       | ^14.5.2      | Simulates user events for React component testing.                      |
| **@types/react**                      | ^18.3.18     | TypeScript definitions for React.                                       |
| **@types/react-dom**                  | ^18.3.5      | TypeScript definitions for React DOM.                                   |
| **@vitejs/plugin-react**              | ^4.3.4       | Plugin for integrating React with Vite.                                 |
| **babel-jest**                        | ^29.7.0      | Babel integration for Jest testing framework.                           |
| **eslint**                            | ^9.17.0      | JavaScript linter for code quality and consistency.                      |
| **eslint-plugin-react**               | ^7.37.2      | ESLint rules for React applications.                                    |
| **eslint-plugin-react-hooks**         | ^5.0.0       | ESLint rules for React Hooks.                                           |
| **eslint-plugin-react-refresh**       | ^0.4.16      | ESLint rules for React Fast Refresh support.                            |
| **globals**                           | ^15.14.0     | Global variables definitions for linting.                               |
| **identity-obj-proxy**                | ^3.0.0       | Mock CSS modules in Jest tests.                                         |
| **jest**                              | ^29.7.0      | JavaScript testing framework.                                           |
| **jest-environment-jsdom**            | ^29.7.0      | Jest environment for simulating a DOM using jsdom.                      |
| **vite**                              | ^6.0.5       | Build tool and development server for React projects.                   |