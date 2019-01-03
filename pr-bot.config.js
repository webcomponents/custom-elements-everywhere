const prbot = require("pr-bot");

module.exports = {
  botUsername: `ce-pr-bot`,
  repoDetails: {
    owner: "robdodson",
    repo: "custom-elements-everywhere"
  },
  plugins: [require("./plugins/compare-results.js")]
};
