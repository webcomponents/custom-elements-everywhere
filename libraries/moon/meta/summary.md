<h4 id="moon-handling-data">Handling data</h4>

By default, Moon passes all data to Custom Elements as attributes. However, Moon
also provides syntax to instruct its bindings to use properties instead. To bind
to a Custom Element property use <code>m-literal:prop.dom="foo"</code>.

<h4 id="moon-handling-events">Handling events</h4>

Moon can listen to native DOM events dispatched from Custom Elements. It
supports all styles of events (lowercase, camelCase, kebab-case, etc).
