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

var init = require("../__shared__/karma-init");

module.exports = function(config) {
  init(config, { libraryName: "Dojo 2", libraryPath: __dirname });

  // Overrides
  config.set({
    files: [
      { pattern: '../../node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js', watched: false },
      { pattern: '../../node_modules/@webcomponents/webcomponentsjs/webcomponents-lite.js', watched: false },
      'tests.webpack.ts'
    ],
    preprocessors: {
      'tests.webpack.ts': ['webpack', 'sourcemap'] // preprocess with webpack and our sourcemap loader
    },
    mime: {
      'text/x-typescript': ['ts']
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
          { test: /\.js?$/, loader: "umd-compat-loader" },
          {
            test: /.*\.ts(x)?$/, use: [
              "umd-compat-loader",
              {
                loader: "ts-loader",
                options: {
                  transpileOnly: true
                }
              }
            ]
          }
        ]
      }
    }
  });
};
