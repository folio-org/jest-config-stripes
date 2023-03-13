# jest-config-stripes

This package provides an extensible shared [jest](https://github.com/facebook/jest) config, intended to promote consistent code style and facilitate maintenance by consolidating test-related dependencies.

## Installation
Add this project as a dev-dependency of your project.

Create `jest.config.js` in the root of your project. Its contents:
```
import config from '@folio/jest-config-stripes';

module.exports = { ...config };
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
