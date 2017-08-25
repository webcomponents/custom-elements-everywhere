<h4 id="dojo2-handling-data">Handling data</h4>

Dojo 2 will pass data as attributes only when the data is a type of `string`, otherwise it is
set as a property.

<h4 id="dojo2-handling-events">Handling events</h4>

Dojo 2 can listen to native DOM events dispatched from Custom Elements. However the event
names must be prefixed with `on`, so a Custom Event of `camelEvent` would be `oncamelEvent`.
Other than that, Dojo 2 supports all kinds of event names.



