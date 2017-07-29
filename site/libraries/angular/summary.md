#### Handling data

Angular's default binding syntax will always set properties on an element. This
works well for rich data, like objects and arrays, and also works well for
primitive values so long as the Custom Element author has mapped any exposed
attributes to corresponding properties. 

Angular also provides binding syntax specifically for setting an attribute, if a
developer would prefer to communicate with an element that way.

#### Handling events

Angular components can listen to native DOM events dispatched from Custom
Elements. It supports all styles of events (lowercase, camelCase, kebab-case,
etc).
