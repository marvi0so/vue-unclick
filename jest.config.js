export default {
  collectCoverageFrom: [
    "./src/**/*.js",
  ],
  coverageDirectory: "./.coverage/js",
  coverageReporters: [
    "lcov",
    "text",
  ],
  coverageThreshold: {
    "global": {
      "lines": 100,
    },
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testEnvironment: "jsdom",
  testMatch: [
    "<rootDir>/tests/**/*.test.js",
  ],
}
