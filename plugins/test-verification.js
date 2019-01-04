const fs = require("fs-extra");
const { join } = require("path");

/**
 * Get the results for each library and return an object where each library's
 * name is the key for its results.
 * @param {*} dir Path to root of the project
 */
function getResults(dir) {
  const results = {};
  fs.readdirSync(join(dir, "libraries"))
    .filter(name => name != "__shared__")
    .forEach(name => {
      const summary = require(join(
        dir,
        "libraries",
        name,
        "results",
        "results.json"
      )).summary;
      results[name] = summary;
    });
  return results;
}

/**
 * Verify there are the same number of libraries in each test results object.
 * @param {*} beforeResults
 * @param {*} afterResults
 */
function checkLengths(beforeResults, afterResults) {
  return Object.keys(beforeResults).length === Object.keys(afterResults).length;
}

/**
 * Verify there are the same library names in each test results object.
 * @param {*} beforeResults
 * @param {*} afterResults
 */
function checkKeys(beforeResults, afterResults) {
  var beforeKeys = Object.keys(beforeResults).sort();
  var afterKeys = Object.keys(afterResults).sort();
  return JSON.stringify(beforeKeys) === JSON.stringify(afterKeys);
}

function compare(beforeResults, afterResults) {
  const failures = [];
  for (let library in beforeResults) {
    const beforeSuccess = beforeResults[library].success;
    const afterSuccess = afterResults[library].success;
    if (beforeSuccess !== afterSuccess) {
      failures.push({
        library,
        beforeSuccess,
        afterSuccess
      });
    }
  }
  return failures;
}

function fail(msg) {
  let prettyLog,
    markdownLog = msg;
  return Promise.resolve({
    failPR: true,
    prettyLog,
    markdownLog
  });
}

function succeed(msg) {
  let prettyLog,
    markdownLog = msg;
  return Promise.resolve({
    failPR: false,
    prettyLog,
    markdownLog
  });
}

module.exports = {
  name: "Test verification",
  run: ({ beforePath, afterPath }) => {
    // When testing locally afterpath will be '.'
    // which resolves to this plugins directory.
    // Change it to point to the root of the project.
    if (afterPath === ".") {
      afterPath = join(__dirname, "..");
    }

    const beforeResults = getResults(beforePath);
    const afterResults = getResults(afterPath);
    if (!checkLengths(beforeResults, afterResults)) {
      console.dir("beforeResults", beforeResults);
      console.dir("afterResults", afterResults);
      return fail(
        `⚠️ Wrong number of tests found. Expected ${
          beforeResults.length
        } but got ${afterResults.length}`
      );
    }

    if (!checkKeys(beforeResults, afterResults)) {
      console.dir("beforeResults", beforeResults);
      console.dir("afterResults", afterResults);
      return fail(
        `⚠️ Wrong library names found. Expected ${Object.keys(
          beforeResults
        )} but got ${Object.keys(afterResults)}`
      );
    }

    const failures = compare(beforeResults, afterResults);
    if (failures.length) {
      let msg = `⚠️ Found the following changes:\n`;
      failures.forEach(failure => {
        msg += `### ${failure.library}\n`;
        msg += `*Tests passing before PR*: ${
          failure.beforeSuccess
        } | *Tests passing after PR*: ${failure.afterSuccess}\n`;
      });
      return fail(msg);
    }

    return succeed("✅ All checks passed!");
  }
};
