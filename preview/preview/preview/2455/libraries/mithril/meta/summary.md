<h4 id="mithril-handling-data">Handling data</h4>

Mithril performs a `key in element` check to determine whether to assign values as properties or attributes: if the element or any of its prototypes have a property definition for the key in question, the value will be assigned as a property. 

<h4 id="mithril-handling-events">Handling events</h4>

Mithril can listen to native DOM events dispatched from Custom Elements. It
supports all styles of events (lowercase, camelCase, kebab-case, etc).
