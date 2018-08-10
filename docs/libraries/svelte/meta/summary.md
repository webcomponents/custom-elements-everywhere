<h4 id="svelte-handling-data">Handling data</h4>

Svelte uses a heuristic to determine whether to pass data as properties or
attributes — if the property is defined on the element instance, a property
is used, otherwise it will fall back to attributes.

<h4 id="svelte-handling-events">Handling events</h4>

Svelte can listen to native DOM events dispatched from Custom Elements.
It supports all styles of events (lowercase, camelCase, kebab-case, etc).
