<h4 id="react-experimental-overview">Experimental</h4>

The @experimental release of React features full support for Custom Elements.

<h4 id="react-experimental-handling-data">Handling data</h4>

React@experimental, as of July 2022, uses a runtime heuristic to determine if it should pass data to Custom Elements as either properties or attributes. If a property is already defined on the element instance, it will use properties, otherwise it will fallback to attributes.

<h4 id="react-experimental-handling-events">Handling events</h4>

React@experimental, as of July 2022, will register an event listener on any custom element when binding a function to a property whose name begins with <code>on</code>. It supports lowercase, camelCase, kebab-case, CAPScase, and PascalCase events.
