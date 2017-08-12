const hbs = require('handlebars');
const path = require('path');
const fs = require('fs');
const marked = require('marked');
const libraries = ['angular', 'preact', 'react', 'vue'];

hbs.registerHelper('capitalize', function(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
});

hbs.registerPartial('octocat',
  fs.readFileSync(path.join(__dirname, '/partials/octocat.handlebars'),
  'utf8'));

const tmpl = fs.readFileSync(path.join(__dirname, 'index.handlebars'), 'utf8');
const render = hbs.compile(tmpl);
const out = render({
  libraries: buildContext(libraries)
});

function buildContext(libraries) {
  return libraries.map(library => {
    return Object.assign({ name: library }, {
      results: getTestResults(library),
      issues: getIssues(library),
      summary: getSummary(library)
    });
  });
}

// Collect important test data like number of successes, fails, totals, etc.
function getTestResults(library) {
  const json = require(
    path.resolve(__dirname, 'libraries', library, 'results.json'));
  const success = json.summary.success;
  const failed = json.summary.failed;
  const total = success + failed
  const percent = success / total * 100;

  return {success, failed, total, percent};
}

// Collect any relevant GitHub issues
function getIssues(library) {
  return require(path.resolve(__dirname, 'libraries', library, 'meta/issues.json'));
}

// Collect markdown summary of library, process markdown, and return as string.
function getSummary(library) {
  const md = fs.readFileSync(
    path.resolve(__dirname, 'libraries', library, 'meta/summary.md'), 'utf8');
  const content = marked(md);

  return {content};
}

// npm build script writes this output to index.html
console.log(out);
