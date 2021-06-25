# Custom Elements Everywhere 🍻

## What is this?

Karma tests for each of the major frameworks to see how they handle working
with Custom Elements.

[![Build Status](https://travis-ci.org/webcomponents/custom-elements-everywhere.svg?branch=master)](https://travis-ci.org/webcomponents/custom-elements-everywhere)
[![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovateapp.com/)

## Installation

To install all dependencies and build the site:

```bash
# Install all the things!
npm ci

# Test all the things!
npm run build

# Preview the site.
npm start
```

## Current List of [Libraries/Frameworks](https://github.com/webcomponents/custom-elements-everywhere/tree/master/libraries)
- [Angular](https://github.com/webcomponents/custom-elements-everywhere/tree/master/libraries/angular)
- [AngularJs](https://github.com/webcomponents/custom-elements-everywhere/tree/master/libraries/angularjs)
- [Dio](https://github.com/webcomponents/custom-elements-everywhere/tree/master/libraries/dio)
- [Dojo](https://github.com/webcomponents/custom-elements-everywhere/tree/master/libraries/dojo)
- [Hybrids](https://github.com/webcomponents/custom-elements-everywhere/tree/master/libraries/hybrids)
- [Hyperapp](https://github.com/webcomponents/custom-elements-everywhere/tree/master/libraries/hyperapp)
- [HyperHTML](https://github.com/webcomponents/custom-elements-everywhere/tree/master/libraries/hyperhtml)
- [Mithril](https://github.com/webcomponents/custom-elements-everywhere/tree/master/libraries/mithril)
- [Polymer](https://github.com/webcomponents/custom-elements-everywhere/tree/master/libraries/polymer)
- [Preact](https://github.com/webcomponents/custom-elements-everywhere/tree/master/libraries/preact)
- [React](https://github.com/webcomponents/custom-elements-everywhere/tree/master/libraries/react)
- [Riot.js](https://github.com/webcomponents/custom-elements-everywhere/tree/master/libraries/riot)
- [Skate](https://github.com/webcomponents/custom-elements-everywhere/tree/master/libraries/skate)
- [Solid](https://github.com/webcomponents/custom-elements-everywhere/tree/master/libraries/solid)
- [Stencil](https://github.com/webcomponents/custom-elements-everywhere/tree/master/libraries/stencil)
- [Surplus](https://github.com/webcomponents/custom-elements-everywhere/tree/master/libraries/surplus)
- [Svelte](https://github.com/webcomponents/custom-elements-everywhere/tree/master/libraries/svelte)
- [Vue](https://github.com/webcomponents/custom-elements-everywhere/tree/master/libraries/vue)

## How do I add a library/framework to the project?

### Step 1. Copy an existing example

Tests for each library/framework live in the `libraries/` directory. The easiest
way to start is by copying the test directory from a project that is similar to
your own. For example, if the library you use is similar to React/Preact, you
might start by copying and renaming the `libraries/preact` directory.

Your library structure should look like this:

```
├── .babelrc
├── karma.conf.js
├── meta
│   ├── issues.json
│   └── summary.md
├── package-lock.json
├── package.json
├── src
│   ├── advanced-tests.js
|   ├── basic-tests.js
│   └── components.js
└── tests.webpack.js
```

#### package.json

Your `package.json` should contain `build` and `test` npm scripts.
The `test` script is in charge of actually running karma.
The `test` script should set a variable, `LIBRARY_NAME`, that corresponds to
your library's npm package name. This is used during the build process to
grab the library's semver and publish it on the site.

Example:
```
"scripts": {
  "test": "cross-env LIBRARY_NAME=@angular/core karma start",
  "build": "npm run test"
},
```

#### karma.conf.js

Your [Karma](https://karma-runner.github.io/1.0/index.html) configuration.
Ideally you shouldn't need to change much in here. The config file uses
[karma-webpack](https://github.com/webpack-contrib/karma-webpack), so there is
a `webpack` property where you can essentially write your `webpack.config.js`.
You'll need to change this property to tell it how to bundle your library.

#### meta/

This directory contains `issues.json` where you list any open GitHub issues
related to custom element support in your library. There is also a `summary.md`
where you write a short description of how the library interacts with custom
elements and any known quirks or gotchas.

#### src/

This directory contains `components.js` where you create library/framework
components which try to communicate with custom elements. You then test these
components in `basic-tests.js` and `advanced-tests.js`. You'll want to use all
of the assertions in the test files but update the actual test implementations
to use your library's components.

Note that all frameworks use the custom elements in the
`/libraries/__shared__/webcomponents/` directory for tests.

#### tests.webpack.js

This file is consumed by the test runner and tells it to import any files ending
in `-test`. You probably won't need to change this file.

### Step 2. Add `npm` scripts

In the root of the project you'll need to add a couple of `npm` scripts to make
sure your library builds with the rest of the site. You should be able to copy
an example from one of the other libraries.

- In the root of the project, Add an `install-*` script to `package.json`.
- In the `libraries/[your library]/` director, update the `build` script in
  `package.json` to include your library's name.

There's a test runner called `index.js` that lives in the root of the project.
It will detect when you've added a new folder to `libraries/` and attempt to
run that folder's build command.

## What kind of behavior do the tests assume?

- The library/framework should be able to display elements that use shadow DOM,
  insert children in them, and handle hiding and showing them.
- The library/framework should be able to pass **primitive** data (strings,
  numbers, booleans) to a custom element as either attributes or properties.
- The library/framework should be able to pass **rich** data (objects, arrays)
  to a custom element using properties.
- The library/framework should be able to listen to DOM events from a custom
  element. These DOM events could use any casing style.

## How does the site get deployed/maintained?

Once a library is added to the repo, we use [Renovate](https://renovatebot.com/)
to ensure both the library and its dependencies stay up to date. Renovate will
automatically merge in updates, so long as they don't change the test scores
for a library. In other words, if merging in an update would cause the library
to start failing some tests, it will hault the PR and request a human intervene.

Any PR landed to the master branch will trigger an automatic publish to GitHub
pages.

## License

Copyright 2017 Google, Inc.

Licensed under the [Apache License, Version 2.0](LICENSE) (the "License");
you may not use this file except in compliance with the License. You may
obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
