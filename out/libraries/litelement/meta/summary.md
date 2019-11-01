<h4 id="hyperhtml-handling-data">Handling data</h4>

By default, LitElement passes all data to Custom Elements as attributes. However, LitElement also provides syntax to instruct its bindings to use properties instead. To bind to a Custom Element property, prefix the property name with a `.` as in `<input .value=${value}>`.

<h4 id="hyperhtml-handling-events">Handling events</h4>

LitElement can listen to native DOM events dispatched from Custom Elements. It
supports all styles of events (lowercase, camelCase, kebab-case, etc).
