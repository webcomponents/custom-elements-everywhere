<h4 id="hyperapp-handling-data">Handling data</h4>

Hyperapp will pass data to an element as properties, as long as the property
is defined on the element's prototype. Otherwise it will fallback to passing
data as attributes.

<h4 id="hyperapp-handling-events">Handling events</h4>

Hyperapp can listen to native DOM events dispatched from Custom Elements. It
supports all styles of events (lowercase, camelCase, kebab-case, etc).
