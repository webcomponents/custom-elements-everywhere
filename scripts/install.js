// Runs npm ci in each of the libraries

const {libraries} = require('./common');
const util = require('util');
const exec = util.promisify(require("child_process").exec);
const {join} = require('path');
const ora = require('ora');

// Runs npm ci in every one of our subpackages.
async function install() {
  const allLibs = [
    ...libraries,
    {name: join('__shared__', 'karma-plugins', 'karma-custom-html-reporter')},
    {name: join('__shared__', 'karma-plugins' , 'karma-custom-json-reporter')},
    {name: join('__shared__', 'karma-plugins', 'karma-mocha')},
    {name: join('__shared__', 'webcomponents')},
  ];
  const packages = allLibs.map((lib) => join(__dirname, '..', 'libraries', lib.name));
  packages.push(join(__dirname, '..', 'docs'));
  const progress = ora('').start();
  for (const pkg of packages) {
    progress.text = `Running \`npm ci\` in ${pkg}`;
    await exec("npm ci", { cwd: pkg });
  }
  progress.succeed("Installed deps of all subpackages");
}

install();
