const prbot = require("pr-bot");

module.exports = {
  botUsername: `ce-pr-bot`,
  repoDetails: {
    owner: "webcomponents",
    repo: "custom-elements-everywhere"
  },
  buildCommand: "npm run install && npm run build",
  plugins: [require("./plugins/test-verification.js")]
};
