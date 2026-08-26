// eslint-disable-next-line import/no-extraneous-dependencies
import path from 'node:path';
import axe from 'axe-core';
import { runAxeTest } from './lib/runAxeTest.js';

// jest ignores the contents of node_modules when pulling things through
// babel for transpilation, assuming that modules have been transpiled
// on publish. this list puts things _back_ on the list of those needing
// transpilation and includes any module that is distributed uncompiled
// as pure-ESM.
const esModules = [
  '@folio',
  '@json2csv',
  'decode-uri-component',
  'filter-obj',
  'find-up',
  'get-stdin',
  'global-dirs',
  'import-lazy',
  'inquirer',
  'is-path-inside',
  'jspdf',
  'ky',
  'query-string',
  'resolve-from',
  'resolve-pkg',
  'split-on-first',
  'uuid',
].join('|');

export default {
  axe,
  runAxeTest,
  config: {
    collectCoverageFrom: [
      '**/(lib|src)/**/*.{js,jsx,ts,tsx}',
      '!**/node_modules/**',
      '!**/test/jest/**',
    ],
    coverageDirectory: './artifacts/coverage-jest/',
    coverageReporters: ['lcov'],
    moduleNameMapper: {
      '^.+\\.(css|png|svg)$': 'identity-obj-proxy',
      '^helpers/(.*)$': '<rootDir>/test/jest/helpers/$1',
      '^fixtures/(.*)$': '<rootDir>/test/jest/fixtures/$1',
      '^__mock__$': '<rootDir>/test/jest/__mock__/index.js',
      '^__mock__/(.*)$': '<rootDir>/test/jest/__mock__/$1',
    },
    reporters: ['jest-junit', 'default'],
    setupFiles: [
      path.join(import.meta.dirname, './jest-setupFiles.js'),
      'jest-canvas-mock',
    ],
    setupFilesAfterEnv: [
      path.join(import.meta.dirname, './jest-setupFilesAfterEnv.js'),
      'jest-location-mock',
    ],
    testEnvironment: 'jsdom',
    testMatch: ['**/(lib|src)/**/?(*.)test.{js,jsx,ts,tsx}'],
    testPathIgnorePatterns: ['/node_modules/', '/test/bigtest/', '/test/ui-testing/'],
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': [
        '@swc/jest', {
          "jsc": {
            "parser": {
              "jsx": true,
            },
            transform: {
              react: { runtime: 'automatic' },
            },
          }
        },
      ]
    },
    transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
  }
};
