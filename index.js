// eslint-disable-next-line import/no-extraneous-dependencies
const path = require('path');

// jest ignores the contents of node_modules when pulling things through
// babel for transpilation, assuming that modules have been transpiled
// on publish. this list puts things _back_ on the list of those needing
// transpilation and includes any module that is distributed uncompiled
// as pure-ESM.
const esModules = ['@folio', '@json2csv', 'ky', 'uuid'].join('|');

module.exports = {
  collectCoverageFrom: [
    '**/(lib|src)/**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/test/jest/**',
  ],
  coverageDirectory: './artifacts/coverage-jest/',
  coverageReporters: ['lcov'],
  reporters: ['jest-junit', 'default'],
  transform: { '^.+\\.(js|jsx)$': path.join(__dirname, './test/jest/jest-transformer.js') },
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
  moduleNameMapper: {
    '^.+\\.(css|png|svg)$': 'identity-obj-proxy',
  },
  testMatch: ['**/(lib|src)/**/?(*.)test.{js,jsx}'],
  testPathIgnorePatterns: ['/node_modules/', '/test/bigtest/', '/test/ui-testing/'],
  setupFiles: [
    // setupTests.js is a helpful place to put global configuration,
    // but not all repositories have this file in place.
    // path.join(__dirname, './test/jest/setupTests.js'),
    'jest-canvas-mock'
  ],
  setupFilesAfterEnv: [path.join(__dirname, './test/jest/jest.setup.js')],
};
