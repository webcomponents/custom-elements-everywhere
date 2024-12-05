<h4 id="dio-handling-data">Handling data</h4>

DIO uses a runtime heuristic to determine if it should pass data to Custom
Elements as either properties or attributes. If a property is already defined
on the element instance, DIO will use properties, otherwise it will fallback
to attributes. The exception to this rule is when it tries to pass rich data,
like objects or arrays. In those instances it will always use a property.

<h4 id="dio-handling-events">Handling events</h4>

DIO can listen to native DOM events dispatched from Custom Elements. However,
it uses a heuristic to convert JSX event binding syntax into event names, and
always lowercases the events. For example <code>onFooUpdated={handleFoo}</code>
tells DIO to listen for an event called <code>'fooupdated'</code>. This means
DIO can support events with lowercase and kebab-case names, but not
camelCase, PascalCase, or CAPScase events (e.g. <code>'URLchanged'</code>).
