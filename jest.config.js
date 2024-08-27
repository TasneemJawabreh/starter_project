module.exports = {
    // Specifies the root of the project, relative to this config file
    //roots: ["./src"],
  
    // Automatically clear mock calls and instances between every test
    clearMocks: true,
  
    // The test environment that will be used for testing
    testEnvironment: "jsdom",
  
    // A map from regular expressions to paths to transformers
    transform: {
      "^.+\\.jsx?$": "babel-jest",
    },
  
    // An array of regex patterns that Jest uses to detect test files
    testMatch: ["**/__test__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
  
    // Automatically reset mock state before every test
    resetMocks: true,
  
 
  
    // Code coverage settings (optional)
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageReporters: ["text", "lcov"],
  
    // Module name mapper (useful for mocking static assets or styles)
    moduleNameMapper: {
      "\\.(css|less|scss)$": "identity-obj-proxy",
    },
  };
  