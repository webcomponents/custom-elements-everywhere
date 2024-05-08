<h4 id="preact-handling-data">Handling data</h4>

Preact uses a runtime heuristic to determine if it should pass data to Custom
Elements as either properties or attributes. If a property is already defined
on the element instance, Preact will use properties, otherwise it will fallback
to attributes. The exception to this rule is when it tries to pass rich data,
like objects or arrays. In those instances it will always use a property.

<h4 id="preact-handling-events">Handling events</h4>

Preact can listen to native DOM events dispatched from Custom Elements. It uses
a heuristic to convert JSX event binding syntax into event names. It supports
lowercase, camelCase, kebab-case, CAPScase, and PascalCase events.
