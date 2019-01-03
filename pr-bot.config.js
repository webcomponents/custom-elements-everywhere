const prbot = require("pr-bot");

module.exports = {
  botUsername: `ce-pr-bot`,
  repoDetails: {
    owner: "webcomponents",
    repo: "custom-elements-everywhere"
  },
  buildCommand: "echo 'Hello World'",
  plugins: [require("./plugins/compare-results.js")]
};
