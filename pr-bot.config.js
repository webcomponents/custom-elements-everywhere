const prbot = require('pr-bot');

module.exports = {
  botUsername: `ce-pr-bot`,
  repoDetails: {
    owner: 'robdodson',
    repo: 'custom-elements-everywhere',
  },
  plugins: [
    new prbot.plugins.Size({
      globPattern: '**/*.js',
      globOptions: {
        ignore: [
          '**/node_modules/**/*',
        ]
      },
    }),
  ],
};