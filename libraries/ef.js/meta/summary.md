<h4 id="ef-handling-data">Handling data</h4>

ef.js is simple and straight forward. All things are directly passed to the actual html elements, including Custom Elements.
ef.js provides intuitive syntax to instruct its bindings. To bind
to an element property use <code>%foo.bar = baz</code>,
to bind an element attribute use <code>#foo = bar</code>,
and to bind an element event use <code>@someEvent = handler</code>.

<h4 id="ef-handling-events">Handling events</h4>

ef.js can listen to native DOM events dispatched from Custom Elements. It supports
all styles of events (lowercase, camelCase, kebab-case, etc).
