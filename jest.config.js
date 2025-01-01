export default {
    testEnvironment: 'jsdom',
    transform: {
      "^.+\\.jsx?$": "babel-jest"
    },
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy"
    },
    setupFilesAfterEnv: [
      "/Users/yashatre/Desktop/Projects/Adobe/reactapp/jest.setup.js"
    ],
  };