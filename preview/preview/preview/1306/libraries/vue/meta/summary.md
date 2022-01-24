<h4 id="vue-handling-data">Handling data</h4>

By default, Vue passes all data to Custom Elements as attributes. However, Vue
also provides syntax to instruct its bindings to use properties instead. To bind
to a Custom Element property use <code>:foo.prop="bar"</code>.

<h4 id="vue-handling-events">Handling events</h4>

Vue can listen to native DOM events dispatched from Custom Elements. It supports
all styles of events (lowercase, camelCase, kebab-case, etc).
