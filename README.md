# React Frontend for Roman Numeral Converter

## Table of Contents

1. [Build and Run Instructions](#build-and-run-instructions)  
   - [Prerequisites](#prerequisites)  
   - [Steps](#steps)  
   - [Testing Instructions](#testing-instructions)  
2. [Project Overview](#project-overview)  
3. [Roman Numerals Specification Used in This Project](#roman-numerals-specification-used-in-this-project)  
   - [Symbols and Values](#symbols-and-values)  
   - [Rules Implemented](#rules-implemented)  
   - [Algorithm Implementation](#algorithm-implementation)  
   - [Example Conversion](#example-conversion)  
   - [Complexity Analysis](#complexity-analysis)  
4. [Demo Video](#demo-video)  
5. [Engineering and Testing Methodology](#engineering-and-testing-methodology)  
   - [Engineering Approach](#engineering-approach)  
      - [Component Design](#component-design)  
      - [Algorithm](#algorithm)  
      - [Theme Change/Detection](#theme-changedetection)  
      - [Performance Monitoring](#performance-monitoring)  
      - [Responsiveness](#responsiveness)  
   - [Testing Approach](#testing-approach)  
      - [Unit Testing](#unit-testing)  
      - [Automation](#automation)  
6. [Packaging Layout](#packaging-layout)  
7. [Dependency Attribution](#dependency-attribution)  
   - [Dependencies](#dependencies)  
   - [DevDependencies](#devdependencies)  

---
## Build and Run Instructions

### Prerequisites
- **Express.js API setup** https://github.com/yashatre98/Number-to-Roman.git
- **Node.js** (version 18 or later recommended)  
- **npm** (comes bundled with Node.js)  
- **Docker Desktop** Install [docker desktop](https://www.docker.com/products/docker-desktop/) and open it, set paths if needed.
- **Verify dependencies** 
    1. Access API on http://localhost:3000/
    2. Verify dependency installation
       ```bash
          test_directory % node --version
          test_directory % npm --version
          test_directory % docker --version
       ```
   once you get versions as outputs, Open docker desktop and move back to your IDE.
### Steps
0. **Backend API Setup**:
    ```
    API should be running at localhost:3000 by deafult.
    Move to next step if already done.
    Setup the Express API using this link: 
    https://github.com/yashatre98/Number-to-Roman/blob/main/README.md

1. **Clone the Repository**: 
   ```bash
   test_directory % git clone https://github.com/yashatre98/React-Roman-numerals.git
   test_directory % cd React-Roman-numerals
   React-Roman-numerals % 
2. **Install Dependencies**:
   ```bash
   React-Roman-numerals % npm install
3. **Testing Instructions**:
    ```bash
    React-Roman-numerals % npm test 
    React-Roman-numerals % npm run test:coverage

         this will generate coverage report too. 
4. **Build docker image**:
    ```bash
    React-Roman-numerals % docker build --no-cache -t reactapp .
5. **Run the image**:
   ```bash
   React-Roman-numerals % docker run -p 5173:5173 reactapp
6. **Access the image in container**:
   ```bash
   React-Roman-numerals % docker run -it --entrypoint sh reactapp

   Shell changed
   
   /usr/src/app #
7. **Shell change to container entrypoint**:
   ```bash
   /usr/src/app # ls

   output should be like this :
   /usr/src/app # ls
   Dockerfile         README.md          coverage           index.html         jest.setup.js      node_modules       package.json       script.js          vite.config.js
   LICENSE            babel.config.cjs   eslint.config.js   jest.config.cjs    logger.js          package-lock.json  public             src
8. **Run tests in container**:
   ```bash
   /usr/src/app # npm run test:coverage
   this will generate coverage report too.
9. **Access the application**  
    ```
    Open your browser and navigate to:
   http://localhost:5173

10. **Testing Instructions on local shell**
    ```bash
    React-Roman-numerals % npm install 
    React-Roman-numerals % npm test 
    React-Roman-numerals % npm run test:coverage
            this should show the coverage too
11. **Access Coverage report**:
    ```
    React-Roman-numerals % open coverage/lcov-report/index.html

               It will open coverage report in default browser. 
               This can only run outside docker.
<img width="1509" alt="image" src="https://github.com/user-attachments/assets/00212e77-9456-4f5b-9ce0-5efee138e83d" />


---
## Project Overview

This project is a **Roman Numeral Converter** built with React. It includes two distinct independent implementations:  
1. **Custom Converter Component** - A standard component with a light/dark mode toggle.  
2. **Adobe Spectrum-Based Component** - Utilizes Adobe React Spectrum for theme auto-detection.  

The project also integrates **performance monitoring** using `web-vitals` and logs metrics to a backend server.

---
## Roman Numerals Specification Used in This Project

### Symbols and Values  
The algorithm uses **seven Roman numeral symbols**:  
[**Roman Numerals - Wikipedia**](https://en.wikipedia.org/wiki/Roman_numerals)
| Symbol | Value  |
|--------|--------|
| **I**  | 1      |
| **V**  | 5      |
| **X**  | 10     |
| **L**  | 50     |
| **C**  | 100    |
| **D**  | 500    |
| **M**  | 1000   |

---

### Rules Implemented

1. **Addition Rule**:  
   - Symbols are **added** when placed in **descending order**.  
   - Example: **VI = 5 + 1 = 6**.  

2. **Subtraction Rule**:  
   - Subtractive notation is handled using **specific pairs** (e.g., **IV = 4**, **IX = 9**).  
   - The function predefines these cases in the **lookup table**:  
     - **IV (4)**, **IX (9)**, **XL (40)**, **XC (90)**, **CD (400)**, **CM (900)**.  
   - These pairs are prioritized before larger values to handle **subtraction first**.  

3. **Descending Order Processing**:  
   - The lookup table is **sorted in descending order** by value.  
   - The function iterates through the table, **subtracting values** and **appending numerals** until the input is reduced to zero.  

4. **Repetition Limit**:  
   - Symbols **I, X, C, and M** can be repeated **up to 3 times**.  
   - Symbols **V, L, and D** **cannot be repeated**.  
   - This rule is inherently enforced by the **lookup table**, as it avoids direct repetitions by including combined pairs (e.g., **IV** instead of **IIII**).  

5. **Input Validation**:  
   - The API accepts only **positive integers**.  
   - Inputs like **zero**, **negative numbers**, and **non-numeric values** are **handled at the frontend** to prevent invalid API calls.  

---

### Algorithm Implementation
- **Mapping Table**:  
  - Predefined lookup table stores values and corresponding numerals, including **subtractive pairs** like **IV** and **IX**.  

- **Iteration Logic**:  
  - Starts with the **largest value** and checks if it fits into the input number.  
  - Repeatedly **subtracts the value** and **appends the numeral** until the number is fully converted.  

- **Output**:  
  - Returns the **Roman numeral string** (e.g., **10 → X**).  
  - Displays **error messages** for invalid inputs at the frontend level.  

---

### Example Conversion:

| Input | Process                               | Output   |
|-------|---------------------------------------|----------|
| **58**  | 50 → L, 5 → V, 3 → III                | **LVIII** |
| **1994**| 1000 → M, 900 → CM, 90 → XC, 4 → IV   | **MCMXCIV** |
| **9**   | 9 → IX                                | **IX**    |
| **4**   | 4 → IV                                | **IV**    |

---

### Complexity Analysis:

- **Time Complexity**:  
  **O(n)** - The algorithm iterates based on the value of the input, reducing it step-by-step, which makes it proportional to the input size.  

- **Space Complexity**:  
  **O(1)** - The mapping table is **fixed-size**, and only a **result string** is dynamically updated.  

---
## Demo Video
![demo_gif](https://github.com/user-attachments/assets/9e5b3174-4c17-42dd-a5ce-dd1aff001f8a)



---
## Engineering and Testing Methodology

### Engineering Approach
- **Component Design:**
  - **`manualConverter.jsx`** - Implements the primary Roman numeral converter with a toggleable theme button.
  - **`adobeSpectrumConverter.jsx`** - Uses Adobe Spectrum component library for theme-aware rendering without manual toggling.
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
  - Rest of the files detailed comments availble on top of files.
 
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
│   │   ├── manualConverter.jsx             # manual custom converter  
│   │   ├── adobeSpectrumConverter.jsx     # Adobe Spectrum-based converter  
│   ├── Tests/                         # Test files  
│   │   ├── app.test.jsx               # Tests for app.jsx  
│   │   ├── Converter.test.jsx         # Tests for 
│   │   ├── logger.test.jsx            # Tests for logger
│   │   ├── main.test.jsx              # Tests for main.jsx
│   │   ├── SpectrumConverter.test.jsx # Tests for adobeSpectrumConverter.jsx
│   │   ├── vitals.test.jsx            # Tests for vitals.js  
│   ├── App.css                # App styles  
│   ├── App.jsx                # Root component  
│   ├── index.css              # Global styles  
│   ├── main.jsx               # React entry point  
│   ├── vitals.js              # Logs performance metrics  
├── README.md                  # Project documentation  
├── package.json               # Project metadata  
├── logger.js                  # Logger  
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