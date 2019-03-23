#!/bin/bash
set -e # Exit with nonzero exit code if anything fails

SOURCE_BRANCH="master"

# Pull requests and commits to other branches shouldn't try to deploy.
# Instead, let the PR-Bot handle it.
if [ "$TRAVIS_PULL_REQUEST" != "false" -o "$TRAVIS_BRANCH" != "$SOURCE_BRANCH" ]; then
  echo "Skipping deploy; just doing a build."
  npm install -g pr-bot
  pr-bot
  exit 0
fi

# Build the site and deploy to firebase
npm run build
npm install -g firebase-tools
firebase deploy --token "$FIREBASE_TOKEN" --only hosting