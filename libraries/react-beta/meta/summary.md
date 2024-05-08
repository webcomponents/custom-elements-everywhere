<h4 id="react-1beta-overview">React Beta</h4>

The React 19 Beta features full support for Custom Elements.

<h4 id="react-beta-handling-data">Handling data</h4>

React@beta, as of April 2024, uses a runtime heuristic to determine if it should pass data to Custom Elements as either properties or attributes. If a property is already defined on the element instance, it will use properties, otherwise it will fallback to attributes.

<h4 id="react-beta-handling-events">Handling events</h4>

React@beta, as of April 2024, will register an event listener on any custom element when binding a function to a property whose name begins with <code>on</code>. It supports lowercase, camelCase, kebab-case, CAPScase, and PascalCase events.
