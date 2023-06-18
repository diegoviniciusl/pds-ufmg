module.exports = {
  coverageDirectory: 'coverage',
  moduleFileExtensions: ['ts', 'js'],
  testEnvironment: 'node',
  testMatch: ['**/?(*.)(spec|test).ts?(x)'],
  testPathIgnorePatterns: ['/node_modules/', '/coverage/', '/dist/'],
  preset: 'ts-jest',
  roots: [
    '<rootDir>/__test__',
  ],
  globals: {
    NODE_ENV: 'test',
  },
};
