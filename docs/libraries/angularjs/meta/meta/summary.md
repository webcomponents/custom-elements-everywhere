<h4 id="angular-handling-data">Handling data</h4>

AngularJS can declaratively pass data to attributes using <code>ng-attr</code>.
This works well for primitive data (booleans, numbers, strings), but does not
work for complex data like objects or arrays. Passing complex data would need
to be manually wired up in JavaScript.

<h4 id="angular-handling-events">Handling events</h4>

AngularJS can listen to native DOM events imperatively, by selecting the element
and adding an `.on()` event handler. Declarative event handling is not
supported.
