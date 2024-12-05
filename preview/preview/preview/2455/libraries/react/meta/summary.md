<h4 id="react-handling-data">Handling data</h4>

As of v19, React now uses a runtime heuristic to determine if it should pass data to Custom Elements as either properties or attributes. If a property is already defined on the element instance, it will use properties, otherwise it will fallback to attributes.

<h4 id="react-handling-events">Handling events</h4>

React will register an event listener on any custom element when binding a function to a property whose name begins with <code>on</code>. It supports lowercase, camelCase, kebab-case, CAPScase, and PascalCase events.
