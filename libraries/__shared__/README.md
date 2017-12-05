## karma-plugins

### karma-mocha

This is a fork of the Mocha adapter for Karma. The primary change is to add
the ability for a test to define a weight on its context and report those
values to Karma. This lets us do weighted averages for basic and advanced tests.

### karma-custom-html-reporter

This is a fork of the karma-html-reporter. It modifies the layout so it can be
used in the test results pages on custom-elements-everywhere.com

### karma-custom-json-reporter

This is a fork of the karma-json-reporter. It adds a number of features around
summarizing tests, scoring them, and also including information about the
library/framework under test. This information is used by the Handlebars
templates to produce the library scores on custom-elements-everywhere.com

## webcomponents

This is a shared group of vanilla custom elements that all of the tests depend
upon.
