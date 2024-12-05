<h4 id="angular-handling-data">Handling data</h4>

Angular's default binding syntax will always set properties on an element. This
works well for rich data, like objects and arrays, and also works well for
primitive values so long as the Custom Element author has mapped any exposed
attributes to corresponding properties. 

Angular also provides binding syntax specifically for setting an attribute, if a
developer would prefer to communicate with an element that way.

<h4 id="angular-handling-events">Handling events</h4>

Angular components can listen to native DOM events dispatched from Custom
Elements. It supports all styles of events (lowercase, camelCase, kebab-case,
etc).
