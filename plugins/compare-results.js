const fs = require("fs-extra");
const { join } = require("path");

module.exports = {
  name: "Compare Results",
  run: ({ beforePath, afterPath }) => {
    const shouldFailPR = false;
    const oldResults = require(join(
      beforePath,
      "libraries",
      "angular",
      "results.json"
    ));
    console.log('old success:', oldResults.summary.success);

    const newResults = require(join(
      afterPath,
      "libraries",
      "angular",
      "results.json"
    ));
    console.log('new success:', newResults.summary.success);

    if (newResults.summary.success != oldResults.summary.success) {
      console.log('Results are different. Failing PR!');
      shouldFailPR = true;
    }

    const pLog = "Oh no, results were different!";
    const mdLog = `
      #Oh no, results were different!
      ## Angular
      *Before*: ${oldResults.summary.success}
      *After*: ${newResults.summary.success}
    `;

    return Promise.resolve({
      failPR: shouldFailPR,
      prettyLog: pLog,
      markdownLog: mdLog
    });
  }
};
