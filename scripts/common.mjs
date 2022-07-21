import * as fs from 'fs';
import * as pathlib from 'path';
import minimist from 'minimist';
import { fileURLToPath } from 'url';

const __dirname = pathlib.dirname(fileURLToPath(import.meta.url));

/**
 * Supported options:
 * -v, --verbose      Verbose output
 * -e, --exclude      Exclude a library from tests
 */
export const opts = minimist(process.argv.slice(2), {
  boolean: ["verbose", "update-goldens"],
  string: "exclude",
  alias: { v: "verbose", e: "exclude", u: "update-goldens" }
});

/**
 * A short term list of libraries that we don't test. If we can't
 * fix it in a reasonable period of time, we should just remove it entirely.
 */
const knownBroken = [];

/**
 * Build the list of directories to exclude from testing.
 * For example, if the user passed in -e angular we should test all libraries
 * except for angular.
 * Note, we always exclude the __shared__ directory which contains resources
 * the libraries use internally for testing.
 */
const excludes = [
  "__shared__",
  ...knownBroken,
  ...(Array.isArray(opts.exclude) ? opts.exclude : [opts.exclude])
];

/**
 * Build a data object for each library containing the library's name,
 * path to its tests, and path to its home in the docs folder.
 * If the user passed in a list of libraries to test, juse use those,
 * otherwise, test all of the subfolders in the libraries directory, minus
 * any excluded ones.
 */
export let libraries;
if (opts._.length) {
  libraries = opts._;
} else {
  libraries = fs.readdirSync(pathlib.join(__dirname, "..", "libraries"));
}
libraries = libraries
  .filter(name => excludes.indexOf(name) === -1)
  .map(name => {
    return {
      name,
      testsPath: pathlib.join(__dirname, "..", "libraries", name),
      metaPath: pathlib.join(__dirname,"..", "libraries", name, "meta"),
      resultsPath: pathlib.join(__dirname,"..", "libraries", name, "results"),
      docsPath: pathlib.join(__dirname,"..", "docs", "libraries", name),
      packageJson: JSON.parse(fs.readFileSync(pathlib.join(__dirname, "..", "libraries", name, "package.json")))
    };
  });
