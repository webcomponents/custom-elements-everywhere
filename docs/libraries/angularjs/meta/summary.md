<h4 id="angular-handling-data">Handling data</h4>

AngularJS cannot bind to a custom element's attributes or properties without
custom directives.

Helper libraries are available to manage these directives, such as
[angular-custom-elements][angular-custom-elements].

<h4 id="angular-handling-events">Handling events</h4>

AngularJS can listen to native DOM events imperatively, by selecting the element
and adding an `.on()` event handler. Declarative event handling is not
supported.

Libraries such as [angular-custom-elements][angular-custom-elements] can set
event listeners declarative, based on particular event naming conventions.

[angular-custom-elements]: https://github.com/robdodson/angular-custom-elements
