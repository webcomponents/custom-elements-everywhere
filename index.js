const fs = require("fs-extra");
const { join } = require("path");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const ora = require("ora");

/**
 * Supported options:
 * -v, --verbose      Verbose output
 * -e, --exclude      Exclude a library from tests
 */
const opts = require("minimist")(process.argv.slice(2), {
  boolean: "verbose",
  string: "exclude",
  alias: { v: "verbose", e: "exclude" }
});

/**
 * Build the list of directories to exclude from testing.
 * For example, if the user passed in -e angular we should test all libraries
 * except for angular.
 * Note, we always exclude the __shared__ directory which contains resources
 * the libraries use internally for testing.
 */
let excludes = ["__shared__"];
if (Array.isArray(opts.exclude)) {
  excludes = [...excludes, ...opts.exclude];
} else {
  excludes.push(opts.exclude);
}

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
  await runTests();
  try {
    const spinner = ora('Building site').start();
    await exec("npm run build", { cwd: join(__dirname, "docs") });
    spinner.succeed("Site built successfully!");
  } catch (err) {
    console.error(err);
  }
}

/**
 * Run each library's npm build command.
 * We're using the npm script here because it sets environment variables for
 * each process that are important for karma to pick up on.
 */
async function runTests() {
  for (const library of libraries) {
    const spinner = ora(`Testing ${library.name}`).start();
    // It's ok, and even expected, that the test command will exit(1) since
    // we expect tests to fail for libraries that don't support custom elements.
    // In this instance we catch the error and ignore it.
    try {
      const { stdout, stderr } = await exec(`npm run build`, {
        cwd: library.testsPath
      });
      if (opts.verbose) {
        console.log("stdout:", stdout);
        console.log("stderr:", stderr);
      }
    } catch (err) {
      // Safe to ignore.
    }

    try {
      await verifyResults(library);
      await cleanDocs(library);
      await copyDocs(library);
      spinner.succeed(`${library.name}`);
    } catch (err) {
      spinner.fail(`${library.name}`);
      console.error(err);
    }
  }
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
