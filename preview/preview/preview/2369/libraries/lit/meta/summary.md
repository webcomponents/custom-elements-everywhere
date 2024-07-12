<h4 id="lit-handling-data">Handling data</h4>

By default, Lit passes all data to Custom Elements as attributes. However, Lit also provides syntax to bind to properties instead. To bind to a Custom Element property, prefix the property name with a `.` as in `<input .value=${value}>`.

<h4 id="lit-handling-events">Handling events</h4>

Lit can listen to native DOM events dispatched from Custom Elements. It
supports all styles of events (lowercase, camelCase, kebab-case, etc).
