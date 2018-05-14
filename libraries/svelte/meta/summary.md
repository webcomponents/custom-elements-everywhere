<h4 id="svelte-handling-data">Handling data</h4>

Svelte passes all data to Custom Elements in the form of HTML attributes. For
primitive data this is fine, but the system breaks down when passing rich data,
like objects or arrays. In these instances you end up with stringified values
like <code>some-attr="[object Object]"</code> which can't actually be used.

<h4 id="svelte-handling-events">Handling events</h4>

Svelte can listen to native DOM events dispatched from Custom Elements.
It supports all styles of events (lowercase, camelCase, kebab-case, etc).
