<h4 id="lwc-handling-data">Handling data</h4>

When passing data to a custom element, LWC takes a properties-if-available approach where attributes
are set by default, but properties are set when they exist. This heuristical approach involves a
runtime check to see whether a property is defined, and as such, data will be passed as an attribute
if the custom element has not been upgraded. It is the responsibility of the component author to
handle this scenario.

<h4 id="lwc-handling-events">Handling events</h4>

When listening for events declaratively in the template, LWC supports neither arbitrarily
capitalized event names (camelCase, CAPSCase, PascalCase, etc.) nor kebab-cased names. To listen for
events named in such formats, use `addEventListener()` imperatively.
