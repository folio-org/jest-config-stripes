# jest-config-stripes

This package provides an extensible shared [jest](https://github.com/facebook/jest) config, intended to promote consistent code style and facilitate maintenance by consolidating test-related dependencies.

## Installation
Add this project as a dev-dependency of your project.

Create `./test/jest/babel.config.js`. This file defines the babel-transforms that will affect each file.
```
const { babelOptions } = require('@folio/stripes-cli');

babelOptions.plugins.push([
  'babel-plugin-module-resolver',
  {
    root: ['./'],
    alias: {
      __mock__: './test/jest/__mock__',
      fixtures: './test/jest/fixtures',
      helpers: './test/jest/helpers',
    },
  },
]);

module.exports = {
  ...babelOptions,
};
```
Create `./test/jest/jest-transformer.js` that leverages `babel.config.js` to tell jest how to configure babel:
```
const babelJest = require('babel-jest');
const babelConfig = require('./babel.config');

module.exports = babelJest.createTransformer(babelConfig);
```
Create `./test/jest/jest.setup.js`. This file is essentially a `beforeEach` block that runs before each test; it is a convenient place to include boilerplate code to avoid repeating it in every test file.
```
import '@testing-library/jest-dom';
import 'regenerator-runtime/runtime';
// import './__mock__'; // optional, but convenient
```
Finally, create `./jest.config.js` that knits all this together:
```
const path = require('path');
const config = require('@folio/jest-config-stripes');

module.exports = {
  ...config,
  setupFilesAfterEnv: [path.join(__dirname, './test/jest/jest.setup.js')],
  transform: { '^.+\\.(js|jsx)$': path.join(__dirname, './test/jest/jest-transformer.js') },
};
```

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
