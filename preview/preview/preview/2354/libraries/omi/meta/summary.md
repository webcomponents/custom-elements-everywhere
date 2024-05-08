<h4 id="omi-handling-data">Handling data</h4>

Omi uses a runtime heuristic to determine if it should pass data to Custom Elements as either properties or attributes. If a property is already defined on the element instance, Omi will use properties, otherwise it will fallback to attributes. 

<h4 id="omi-handling-events">Handling events</h4>

Omi can listen to native DOM events dispatched from Custom Elements. It supports all styles of events (lowercase, camelCase, kebab-case, etc).