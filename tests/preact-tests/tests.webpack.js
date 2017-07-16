var context = require.context('./src', true, /-tests\.js$/); // make sure you have your directory and regex test set correctly!
context.keys().forEach(context);
