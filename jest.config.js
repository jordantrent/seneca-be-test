/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {}],
  },
  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/src/$1',
    '^@tests/(.*)$': '<rootDir>/tests/$1',
  },
  moduleDirectories: [
    'node_modules',
    'src',
  ],
};