<h4 id="angular-handling-data">Handling data</h4>

AngularJS' binding syntax allows binding to a custom element's attributes, but
binding to properties requires custom directives.

Helper libraries are available to manage these directives, such as
[angular-custom-elements][angular-custom-elements].

<h4 id="angular-handling-events">Handling events</h4>

AngularJS can listen to native DOM events imperatively, by selecting the element
and adding an `.on()` event handler. Declarative event handling is only
supported for specific, predefined events out-of-the-box. Declaratively handling
other events requires custom directives.

Libraries such as [angular-custom-elements][angular-custom-elements] can set
event listeners declaratively, based on particular event naming conventions.

[angular-custom-elements]: https://github.com/robdodson/angular-custom-elements
