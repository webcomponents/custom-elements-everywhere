<h4 id="hybrids-handling-data">Handling data</h4>

Hybrids will pass data to an element as properties, as long as the property
is defined on the element's prototype. Otherwise it will fallback to passing
data as attributes.

<h4 id="hybrids-handling-events">Handling events</h4>

Hybrids can listen to native DOM events dispatched from Custom Elements. It
supports all styles of events (lowercase, camelCase, kebab-case, etc).
