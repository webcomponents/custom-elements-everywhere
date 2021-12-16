const fs = require("fs-extra");
const { join } = require("path");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const ora = require("ora");
const chai = require("chai");

/**
 * Supported options:
 * -v, --verbose      Verbose output
 * -e, --exclude      Exclude a library from tests
 */
const opts = require("minimist")(process.argv.slice(2), {
  boolean: ["verbose", "update-goldens"],
  string: "exclude",
  alias: { v: "verbose", e: "exclude", u: "update-goldens" }
});

/**
 * A short term list of libraries that we don't test. If we can't
 * fix it in a reasonable period of time, we should just remove it entirely.
 */
const knownBroken = [
  /* 
  Error:
  +-------------------------------------------------------------------------------
  |  Corrupt File: /home/runner/work/custom-elements-everywhere/custom-elements-everywhere/libraries/elm/elm-stuff/0.19.1/o.dat
  |   Byte Offset: 331591
  |       Message: not enough bytes
  |
  | Please report this to https://github.com/elm/compiler/issues
  | Trying to continue anyway.
  +-------------------------------------------------------------------------------
  
  -- CORRUPT CACHE ---------------------------------------------------------------
  
  It looks like some of the information cached in elm-stuff/ has been corrupted.
  
  Try deleting your elm-stuff/ directory to get unstuck.
  
  Note: This almost certainly means that a 3rd party tool (or editor plugin) is
  causing problems your the elm-stuff/ directory. Try disabling 3rd party tools
  one by one until you figure out which it is!
  */
  'elm'
];

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
let libraries;
if (opts._.length) {
  libraries = opts._;
} else {
  libraries = fs.readdirSync(join(__dirname, "libraries"));
}
libraries = libraries
  .filter(name => excludes.indexOf(name) === -1)
  .map(name => {
    return {
      name,
      testsPath: join(__dirname, "libraries", name),
      metaPath: join(__dirname, "libraries", name, "meta"),
      resultsPath: join(__dirname, "libraries", name, "results"),
      docsPath: join(__dirname, "docs", "libraries", name)
    };
  });

/**
 * Run all tests and rebuild the docs site.
 */
async function buildSite() {
  const failed = await runTests();
  if (failed) {
    process.exitCode = 1;
    console.error('\n\nFailed to generate test results');
    return;
  }
  const spinner = ora('Building site').start();
  try {
    await exec("npm run build", { cwd: join(__dirname, "docs") });
    spinner.succeed("Site built successfully!");
  } catch (err) {
    console.error(err);
    spinner.fail("Failed to build site");
    process.exitCode = 1;
  }
}

/**
 * Run each library's npm build command.
 * We're using the npm script here because it sets environment variables for
 * each process that are important for karma to pick up on.
 */
async function runTests() {
  let failed = false;
  const verb = opts['update-goldens'] ? "Updating test goldens" : "Testing";
  console.log(`\n### ${verb}\n`);
  for (const library of libraries) {
    const spinner = ora(`Testing ${library.name}`).start();
    let debugInfo = "";
    try {
      const { stdout, stderr } = await exec(`npm run build`, {
        cwd: library.testsPath
      });
      debugInfo = `stdout: \n${stdout}\n\nstderr: \n${stderr}\n\n`;
    } catch (err) {
      debugInfo = err;
      // It's ok, and even expected, that the test command will exit(1) since
      // we expect tests to fail for libraries that don't support custom elements.
      // In this instance we catch the error and ignore it.
    }
    try {
      await verifyResults(library);
      await cleanDocs(library);
      await copyDocs(library);
      spinner.succeed(`${library.name}`);
    } catch (err) {
      spinner.fail(`${library.name}`);
      console.error(err);
      console.error(`More info:\n`, debugInfo);
      failed = true;
    }
  }
  return failed;
}

/**
 * Verify the tests generated results and all other required files are present
 * before copying things over to the docs site.
 * @param {*} library
 */
async function verifyResults(library) {
  const { metaPath, resultsPath } = library;
  // Verify files, throw otherwise
  if (!fs.existsSync(join(metaPath, "issues.json")))
    throw new Error("Missing issues.json");
  if (!fs.existsSync(join(metaPath, "summary.md")))
    throw new Error("Missing summary.md");
  if (!fs.existsSync(join(resultsPath, "results.json")))
    throw new Error("Missing results.json");
  if (!fs.existsSync(join(resultsPath, "results.html")))
    throw new Error("missing results.html");
  compareResultsAgainstGoldens(library);
}

function compareResultsAgainstGoldens(library) {
  let actual;
  try {
    actual = JSON.parse(fs.readFileSync(join(library.resultsPath, "results.json"))).summary;
  } catch (err) {
    throw new Error(`Could not read results.json for ${library.name}: ${err}`);
  }
  const goldensLocation = join(library.metaPath, "expectedResults.json");
  if (opts['update-goldens']) {
    fs.writeFileSync(goldensLocation, JSON.stringify(actual, null, 2));
    return;
  }
  let expected;
  try {
    expected = JSON.parse(fs.readFileSync(join(library.metaPath, "expectedResults.json")));
  } catch (err) {
    throw new Error(`Could not read expectedResults.json for ${library.name}:\n    ${err}`);
  }
  chai.assert.deepEqual(actual, expected);
}

/**
 * Remove previous test results from the docs site.
 * @param {*} library
 */
async function cleanDocs(library) {
  const { docsPath } = library;
  fs.removeSync(join(docsPath, "meta"));
  fs.removeSync(join(docsPath, "results"));
}

/**
 * Copy the new test results to the docs site.
 * @param {*} library
 */
async function copyDocs(library) {
  const { metaPath, resultsPath, docsPath } = library;
  fs.copySync(metaPath, join(docsPath, "meta"));
  fs.copySync(resultsPath, join(docsPath, "results"));
}

// Build all the things! 🚀
buildSite();
