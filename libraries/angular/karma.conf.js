/**
 * @license
 * Copyright 2017 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var webpack = require("webpack");
var init = require("../__shared__/karma-init");

module.exports = function(config) {
  init(config, { libraryName: "Angular", libraryPath: __dirname });

  // Overrides
  config.set({
    files: [
      {
        pattern:
          "../../node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js",
        watched: false
      },
      {
        pattern:
          "../../node_modules/@webcomponents/webcomponentsjs/webcomponents-lite.js",
        watched: false
      },

      // RxJs.
      { pattern: "../../node_modules/rxjs/**/*.js", included: false, watched: false },
      {
        pattern: "../../node_modules/rxjs/**/*.js.map",
        included: false,
        watched: false
      },
      "tests.webpack.ts"
    ],
    preprocessors: {
      "tests.webpack.ts": ["webpack", "sourcemap"] // preprocess with webpack and our sourcemap loader
    },
    mime: {
      "text/x-typescript": ["ts"]
    },
    webpack: {
      resolve: {
        extensions: [".js", ".ts"]
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            loaders: ["babel-loader"],
            exclude: /node_modules/
          },
          {
            test: /\.ts$/,
            loaders: ["awesome-typescript-loader", "angular2-template-loader"],
            exclude: /node_modules/
          }
        ]
      },
      plugins: [
        // Workaround needed for angular 2 angular/angular#11580
        new webpack.ContextReplacementPlugin(
          // The (\\|\/) piece accounts for path separators in *nix and Windows
          /angular(\\|\/)core(\\|\/)@angular/,
          "./src" // location of your src
        )
      ]
    }
  });
};
