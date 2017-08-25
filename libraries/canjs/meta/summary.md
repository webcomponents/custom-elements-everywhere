<h4 id="canjs-handling-data">Handling data</h4>

CanJS passes all data to Custom Elements in the form of HTML attributes. For
primitive data this is fine, but the system breaks down when passing rich data,
like objects or arrays. In these instances, you end up with concatenated or
stringified values like <code>array-attr="1,2,3,4"</code> or
<code>object-attr="[object Object]"</code>, which can't actually be used.

<h4 id="canjs-handling-events">Handling events</h4>

CanJS components can listen to native DOM events dispatched from Custom Elements.
It supports all styles of events (lowercase, camelCase, kebab-case, etc).
