<h4 id="h3-handling-data">Handling data</h4>

H3 passes data to Custom Elements as attributes only if their values are non-empty
strings, and set properties in all other cases. This allows for even complex values 
like objects and arrays to be automatically stored as properties, without polluting 
the DOM with non-meaningful attributes.

<h4 id="h3-handling-events">Handling events</h4>

H3 can listen to native DOM events dispatched from Custom Elements. It
supports all styles of events (lowercase, camelCase, kebab-case, etc).
