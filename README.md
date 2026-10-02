# jest-config-stripes

This package exports a jest-runner script (`stripes-jest`) and shared
configuration.

## Description

This package provides access to [jest](https://jestjs.io/) and several
[testing library](https://testing-library.com/docs/) packages. By
supplying a pass-through script for jest (`stripes-jest`) and
re-exporting testing-library's `dom`, `jest-dom`, `react`,
`react-hooks`, and `user-event` packages, it provides a one-stop-shop
for test-related dependencies, allowing this repository to be
self-contained and allowing permitting dependent packages to depend on
this package and **no others**.

## Installation and configuration

Add this repository as a dev-dep:
```
yarn add -D @folio/jest-config-stripes
```
Remove all dev-deps related to `jest` or `@testing-library`.

Add/update `./jest.config.js` in the root of your project:
```
import path from 'node:path';
import jcs from '@folio/jest-config-stripes';
const { config, axe } = jcs;

export default {
  ...config,
  setupFiles: [
    ...config.setupFiles,
    path.join(import.meta.dirname, './test/jest/setupFiles.js'),
  ],
};
```

Update `package.json` to label the module as ESM instead of CJS, and add
an entry to the `scripts` section of `package.json`:
```
"type": "module",
"scripts: {
  "test": "stripes-jest"
},
```


Jest is [highly configurable](https://jestjs.io/docs/configuration). In
the example above, the local `setupFiles.js` can be used to
automatically include mocks:
```
import './__mock__';
```

## Usage

Run `yarn stripes-jest` (or `npm run stripes-jest`) in your terminal.
Flags will be passed through to the underlying jest binary. For example,
`yarn stripes-jest --coverage` to report coverage in `./artifacts`. Run
`yarn stripes-jest Foo` to run all the tests in filenames that start
with `Foo`.

## Additional information

See project [STRIPES](https://folio-org.atlassian.net/jira/software/c/projects/STRIPES/boards/86) at the
[FOLIO issue tracker](https://folio-org.atlassian.net/jira/).

Other FOLIO Developer documentation is at [dev.folio.org](https://dev.folio.org/).
