<h4 id="moon-handling-data">Handling data</h4>

Moon will pass all properties to a Custom Element. By default, these are all passed as strings (normal attributes), but Moon provides a way to bind all types to a DOM property as well. To do this, use <code>m-literal:prop.dom="foo"</code>.

<h4 id="moon-handling-events">Handling events</h4>

Moon can listen to native DOM events dispatched from Custom Elements. It supports
all styles of events (lowercase, camelCase, kebab-case, etc).
