<h4 id="skate-handling-data">Handling data</h4>

Skate lets you use a variety of different rendering engines (Preact, React,
lit-html). Most Skate apps these days use Preact, so Skate + Preact should pass
data primarily using properties, and only fall back to attributes if a property
is not defined.

<h4 id="skate-handling-events">Handling events</h4>

Skate's declarative event handling is defined by the rendering engine used. If
you're using Skate + Preact then it will support events with lowercase and
kebab-case names, but not camelCase, PascalCase, or CAPScase events (e.g.
<code>'URLchanged'</code>).
