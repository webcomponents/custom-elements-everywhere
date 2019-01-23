#!/bin/bash
set -e # Exit with nonzero exit code if anything fails

# Deploy script copied from:
# https://gist.github.com/domenic/ec8b0fc8ab45f39403dd

SOURCE_BRANCH="master"
TARGET_BRANCH="gh-pages"

# Pull requests and commits to other branches shouldn't try to deploy.
# Instead, let the PR-Bot handle it.
if [ "$TRAVIS_PULL_REQUEST" != "false" -o "$TRAVIS_BRANCH" != "$SOURCE_BRANCH" ]; then
  echo "Skipping deploy; just doing a build."
  npm install -g pr-bot
  pr-bot
  exit 0
fi

# Save some useful information
REPO=`git config remote.origin.url`
SSH_REPO=${REPO/https:\/\/github.com\//git@github.com:}
SHA=`git rev-parse --verify HEAD`

# Clone the existing gh-pages for this repo into out/
# Create a new empty branch if gh-pages doesn't exist yet
# (should only happen on first deploy)
git clone $REPO out
cd out
git checkout $TARGET_BRANCH || git checkout --orphan $TARGET_BRANCH
# Clean out existing contents
cd ..
# Removes everything except for the .git
# Technically this will leave other dotfiles in place as well
# but we don't have any of those so that's ok :)
rm -rf out/**/* || exit 1

# Run our compile script
npm run install-all
npm run build

# Now let's go have some fun with the cloned repo
cd out
# Experimental: Deploy to Firebase
firebase deploy --token "$FIREBASE_TOKEN"
# Get ready to deploy to gh-pages
git config user.name "Travis CI"
git config user.email "$COMMIT_AUTHOR_EMAIL"

# If there are no changes to the compiled out/
# (e.g. this is a README update) then just bail.
if [[ ! `git status --porcelain` ]]; then
  echo "No changes to the output on this push; exiting."
  exit 0
fi

echo "Found changes; attempting to deploy to gh-pages."
git add -A .
git commit -m "Deploy to GitHub Pages: ${SHA}"

# Get the deploy key by using Travis's stored variables to
# decrypt deploy_key.enc
ENCRYPTED_KEY_VAR="encrypted_${ENCRYPTION_LABEL}_key"
ENCRYPTED_IV_VAR="encrypted_${ENCRYPTION_LABEL}_iv"
ENCRYPTED_KEY=${!ENCRYPTED_KEY_VAR}
ENCRYPTED_IV=${!ENCRYPTED_IV_VAR}
openssl aes-256-cbc -K $ENCRYPTED_KEY -iv $ENCRYPTED_IV -in ../deploy_key.enc -out ../deploy_key -d
chmod 600 ../deploy_key
eval `ssh-agent -s`
ssh-add ../deploy_key

# Now that we're all set up, we can push.
git push $SSH_REPO $TARGET_BRANCH