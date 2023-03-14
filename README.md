# jest-config-stripes

This package provides an extensible shared [jest](https://github.com/facebook/jest) config, intended to promote consistent code style and facilitate maintenance by consolidating and aligning test-related dependencies to make sure they are up to date, compatible with other packages we use (e.g. particular versions of React) and compatible with each other.

## Installation
Add this project as a dev-dependency of your project.

Create `./jest.config.js`:
```
const path = require('path');
const config = require('@folio/jest-config-stripes');

module.exports = { ...config };
```
Remove any dev-dep from your project related to `jest` or `@testing-library`.

Jest is [highly configurable](https://jestjs.io/docs/configuration). One common option is to automatically include your mocks by adding them via `setupFiles`, a list of whose code essentially functions like `beforeEach` block that runs before each test.
```
// ./test/jest/jest-setupFiles.js
import './__mock__';

// ./jest.config.js
const path = require('path');
const config = require('@folio/jest-config-stripes');

module.exports = {
  ...config,
  setupFiles: [
    ...config.setupFiles,
    path.join(__dirname, './test/jest/setupFiles.js'),
  ],
};
```
Any of the keys present in the `index.js` file here may be similarly extended (or replaced) in your application's `jest.config.js` file.

## Usage
* Run `yarn jest` in your terminal to discover test files in the `src` and `lib` directories and run those tests.
* Run `yarn jest --coverage` to report coverage in `./artifacts`.
* Run `yarn jest Foo` to run all the tests in filenames that start with `Foo`.

### Recommended
Add to your `package.json` `scripts`, so you can simply run `yarn test`:
```
"test": "jest"
```

## Additional information

See project [STRIPES](https://issues.folio.org/projects/STRIPES) at the [FOLIO issue tracker](http://dev.folio.org/community/guide-issues).

Other FOLIO Developer documentation is at [dev.folio.org](http://dev.folio.org/).
