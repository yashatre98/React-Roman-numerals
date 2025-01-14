// // jest.config.cjs
// const path = require("path");

// module.exports = {
//     testEnvironment: "jest-environment-jsdom",
//     setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
//     transform: {
//         "^.+\\.jsx?$": "babel-jest",
//     },
//     moduleNameMapper: {
//         "\\.(css|scss)$": "identity-obj-proxy",
//     },
// };

// jest.config.cjs
const path = require("path");

module.exports = {
    testEnvironment: "jest-environment-jsdom",
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    transform: {
        "^.+\\.jsx?$": ["babel-jest", { configFile: path.resolve(__dirname, "babel.config.cjs") }],
    },
    moduleNameMapper: {
        "\\.(css|scss)$": "identity-obj-proxy",
    },
};