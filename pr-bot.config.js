const prbot = require("pr-bot");

module.exports = {
  botUsername: `ce-pr-bot`,
  repoDetails: {
    owner: "webcomponents",
    repo: "custom-elements-everywhere"
  },
  buildCommand: "npm run install-all && npm run build",
  plugins: [require("./plugins/compare-results.js")]
};
