var webpack = require('webpack');
var path = require('path');

module.exports = function (config) {
  config.set({
    // Instead of configuring Karma with multiple browsers for Angular
    // the npm test command will pass in each browser individually. This is
    // to resolve an issue that only seems to occur when testing Angular and
    // Karma using multiple browsers.
    // https://github.com/karma-runner/karma-jasmine/issues/135#issuecomment-262891005
    // browsers: [ 'Chrome', 'Firefox' ], // run in Chrome and Firefox
    singleRun: true, // set this to false to leave the browser open
    frameworks: [ 'mocha' ], // use the mocha test framework
    files: [
      { pattern: path.resolve(__dirname, '../../node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js'), watched: false },
      { pattern: path.resolve(__dirname, '../../node_modules/@webcomponents/webcomponentsjs/webcomponents-lite.js'), watched: false },

      // RxJs.
      { pattern: 'node_modules/rxjs/**/*.js', included: false, watched: false },
      { pattern: 'node_modules/rxjs/**/*.js.map', included: false, watched: false },
      'tests.webpack.ts'
    ],
    preprocessors: {
      'tests.webpack.ts': [ 'webpack', 'sourcemap' ] // preprocess with webpack and our sourcemap loader
    },
    mime: {
      'text/x-typescript': ['ts']
    },
    reporters: [ 'dots', 'html' ], // report results in these formats
    htmlReporter: {
      outputFile: path.resolve(__dirname, '../../site/results/angular/index.html'),
      pageTitle: 'Angular + Custom Elements',
      groupSuites: true,
      useCompactStyle: true
    },
    webpack: { // kind of a copy of your webpack config
      devtool: 'inline-source-map', // just do inline source maps instead of the default
      resolve: {
        extensions: ['.js', '.ts'],
        modules: [
          path.resolve(__dirname, '../webcomponents/src'),
          path.resolve(__dirname, './node_modules')
        ]
      },
      module: {
        rules: [
          // Support for .ts files.
          {
            test: /\.js$/,
            loaders: ['babel-loader'],
            exclude: /node_modules/
          },
          {
            test: /\.ts$/,
            loaders: ['awesome-typescript-loader', 'angular2-template-loader'],
            exclude: /node_modules/
          }
        ]
      },
      plugins: [
        // Workaround needed for angular 2 angular/angular#11580
        new webpack.ContextReplacementPlugin(
          // The (\\|\/) piece accounts for path separators in *nix and Windows
          /angular(\\|\/)core(\\|\/)@angular/,
          './src' // location of your src
        ),
      ]
    },
    webpackServer: {
      // noInfo: true // please don't spam the console when running in karma!
    }
  });
};
