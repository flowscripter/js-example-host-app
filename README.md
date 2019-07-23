# js-example-host-app
[![license](https://img.shields.io/github/license/flowscripter/js-example-host-app.svg)](https://github.com/flowscripter/js-example-host-app/blob/master/LICENSE.md)
[![dependencies](https://img.shields.io/david/flowscripter/js-example-host-app.svg)](https://david-dm.org/flowscripter/js-example-host-app)
[![travis](https://api.travis-ci.com/flowscripter/js-example-host-app.svg)](https://travis-ci.com/flowscripter/js-example-host-app)
[![npm](https://img.shields.io/npm/v/@flowscripter/js-example-host-app.svg)](https://www.npmjs.com/package/@flowscripter/js-example-host-app)

> Example JavaScript host application for the [esm-dynamic-plugins](https://github.com/flowscripter/esm-dynamic-plugins) framework.

## Overview

## Development

Firstly: 

```
npm install
```

then:

Build: `npm run build`

Watch: `npm run watch`

Lint: `npm run lint`

## Further Details

#### Configuration
Explanation of project configuration files:

* `.editorconfig` - Configures [EditorConfig](https://editorconfig.org) compliant editors.
* `.eslintrc.js` - [ESLint](https://eslint.org) configuration for the project.
* `.gitignore` - Specifies files for git to [ignore](https://git-scm.com/docs/gitignore). 
* `.huskyrc.js` - Provides git hooks using [Husky](https://github.com/typicode/husky) to enforce semantic commit messages and linting.   
* `.travis.yml` - Defines the [Travis](https://travis-ci.com) build pipeline.
* `commitlint.config.js` - Configures [commitlint](https://conventional-changelog.github.io/commitlint) to ensure commit messages can be used to drive automated [Semantic Version](https://semver.org) releases.
* `gulpfile.js` - Invoked during the Travis build to run [Sonarqube-scanner](https://github.com/bellingard/sonar-scanner-npm)  
* `jest.config.js` - Configures the unit testing framework [Jest](https://jestjs.io) for JavaScript and coverage reports. 
* `package.js` - Defines development cycle scripts and configures publication of ES2015 modules. 
* `release.config.js` - Configuration for automated semantic version releasing using [semantic-release](https://semantic-release.gitbook.io/semantic-release/)
* `renovate.json` - Ensures automated dependency upgrade via [Renovate](https://renovatebot.com)
* `rollup.config.js` - Defines the ES2015 module build pipeline for [Rollup](https://rollupjs.org/guide/en)

#### No Legacy JavaScript Support

All source and build output is in ES2015 module form. 

Browsers or NodeJS versions need to support:

* https://github.com/tc39/proposal-dynamic-import
* https://tc39.github.io/ecmascript-asyncawait/
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions

Because of this the modules are configured so that:
 
* no transpiling is performed
* `package.json` specifies:
    * `"main": "dist/index.js`
    * `"type": "module"`
    * `"node": ">=12.6.0"` so that the `--experimental-modules` flag can be used and `"type": "module"` can be specified

#### Legacy Module Consumption
 
Legacy CommonJS format npm packages are supported for internal consumption by `rollup-plugin-commonjs`

## License

MIT © Vectronic
