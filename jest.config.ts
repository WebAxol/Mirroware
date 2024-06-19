export default {
  
  setupFilesAfterEnv: ["./jest.setup.ts"],  
  clearMocks: true,
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleFileExtensions : [
    "ts",
    "tsx",
    "js"
  ],
  moduleNameMapper:{
    '^/pluglightjs/(.*)\\.js$': '<rootDir>/vendor/pluglightjs/$1',
    '^(.*)\\.js$': '$1',
  },
  transform: {
    "\\.(ts|tsx)$": "ts-jest",
    '^.+\\.jsx?$': 'babel-jest',
  },
  testRegex: "/__tests__/.*\\.test.(ts|tsx|js)$"
};
