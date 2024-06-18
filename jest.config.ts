export default {
  
  clearMocks: true,
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions : [
    "ts",
    "tsx",
    "js"
  ],
  moduleNameMapper:{
    '^(.*)\\.js$': '$1',
    '/pluglightjs/(.*)$' : '<rootDir>vendor/pluglightjs/$1'
  },
  transform: {
    "\\.(ts|tsx)$": "ts-jest"
  },
  testRegex: "/__tests__/.*\\.(ts|tsx|js)$"
};
