declare var __karma__: any;

// Prevent Karma from running prematurely.
__karma__.loaded = function () {};

// Run basic and advanced tests through Karma
import "./src/basic-tests";
import "./src/advanced-tests";


// Finally, start Karma to run the tests.
__karma__.start();
