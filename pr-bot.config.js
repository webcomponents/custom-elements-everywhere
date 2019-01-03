const prbot = require("pr-bot");

module.exports = {
  botUsername: `ce-pr-bot`,
  repoDetails: {
    owner: "robdodson",
    repo: "webcomponents/custom-elements-everywhere"
  },
  buildCommand: "echo 'Hello World'",
  plugins: [require("./plugins/compare-results.js")]
};
