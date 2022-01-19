<h4 id="dojo-handling-data">Handling data</h4>

Dojo will pass data as attributes only when the data is a type of `string`, otherwise it is
set as a property.

<h4 id="dojo-handling-events">Handling events</h4>

Dojo can listen to native DOM events dispatched from Custom Elements. However the event
names must be prefixed with `on`, so a Custom Event of `camelEvent` would be `oncamelEvent`.
Other than that, Dojo supports all kinds of event names.



