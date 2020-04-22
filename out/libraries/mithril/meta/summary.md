<h4 id="mithril-handling-data">Handling data</h4>

Mithril passes all data to Custom Elements in the form of HTML attributes. For
primitive data this is fine, but the system breaks down when passing rich data,
like objects or arrays. In these instances you end up with stringified values
like <code>some-attr=&quot;[object Object]&quot;</code> which can&#39;t actually be used.

<h4 id="mithril-handling-events">Handling events</h4>

Mithril can listen to native DOM events dispatched from Custom Elements. It
supports all styles of events (lowercase, camelCase, kebab-case, etc).
