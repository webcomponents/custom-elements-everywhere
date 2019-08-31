<h4 id="riot-handling-data">Handling data</h4>

By default, Riot.js passes all data to Custom Elements as attributes. If any of the attributes is not a primitive Riot.js passes it down to the Custom Element as DOM node property <code>domNode.objectAttribute = anObjectAttribute</code>

<h4 id="riot-handling-events">Handling events</h4>

Riot.js can listen to native DOM events dispatched from Custom Elements. It supports
all styles of events (lowercase, camelCase, kebab-case, etc).

