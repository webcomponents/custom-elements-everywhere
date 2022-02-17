<h4 id="polymer-handling-data">Handling data</h4>

Polymer will always attempt to pass data to an element using properties.
To explicitly set an attribute, Polymer provides additional syntax in the form
of the <code>$=</code> annotation.

<h4 id="polymer-handling-events">Handling events</h4>

Polymer supports listening to DOM events using the `on-*` attribute syntax.
It does <em>not</em> support arbitrarily capitalized event names
(camelCase, CAPSCase, PascalCase, etc.). This is because Polymer reads the event
name directly from the HTML attribute, and the HTML parser will always lowercase
attribute names.

You can read more about [this issue and why we test it](#faq-polymer) in the
FAQ.
