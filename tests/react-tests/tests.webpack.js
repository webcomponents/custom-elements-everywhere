// Find all files that end in -tests.js and run them through karma
var context = require.context('./src', true, /-tests\.js$/);
context.keys().forEach(context);
