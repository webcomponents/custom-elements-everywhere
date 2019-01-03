const { join } = require("path");

module.exports = {
  name: "Compare Results",
  run: ({ beforePath, afterPath }) => {

    // When testing locally afterpath will be '.'
    // which resolves to this plugins directory.
    // Change it to point to the root of the project.
    if (afterPath === '.') {
      afterPath = join(__dirname, '..');
    }

    let shouldFailPR = false;
    const oldResultsPath = join(
      beforePath,
      "libraries",
      "angular",
      "results",
      "results.json"
    );
    const oldResults = require(oldResultsPath);

    const newResultsPath = join(
      afterPath,
      "libraries",
      "angular",
      "results",
      "results.json"
    );
    const newResults = require(newResultsPath);

    let pLog;
    let mdLog;
    shouldFailPR = newResults.summary.success != oldResults.summary.success;
    if (shouldFailPR) {
      pLog = "Oh no, results were different!";
      mdLog = `
        #Oh no, results were different!
        ## Angular
        *Before*: ${oldResults.summary.success}
        *After*: ${newResults.summary.success}
      `.trim();
    } else {
      pLog = mdLog = "✅ All checks passed!"
    }

    return Promise.resolve({
      failPR: shouldFailPR,
      prettyLog: pLog,
      markdownLog: mdLog
    });
  }
};
