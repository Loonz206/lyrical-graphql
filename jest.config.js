/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "<rootDir>/__mocks__/styleMock.js",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testMatch: [
    "<rootDir>/server/**/*.test.ts",
    "<rootDir>/client/**/*.test.ts",
    "<rootDir>/client/**/*.test.tsx",
  ],
  collectCoverageFrom: [
    "server/utils/**/*.ts",
    "client/components/**/*.tsx",
    "!**/*.test.{ts,tsx}",
    "!**/node_modules/**",
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  coverageReporters: ["text", "lcov", "clover"],
  transformIgnorePatterns: ["/node_modules/"],
};
