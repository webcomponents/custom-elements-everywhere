<h4 id="hyperhtml-handling-data">Handling data</h4>

hyperHTML is compatible with <a href="https://viperhtml.js.org/hyperhtml/documentation/#essentials-4">different kind of attributes</a>,
including boolean, custom elements special cases, events, and of course regular attributes.<br>
The latter are always set in an observable way through <code>node.setAttribute(name, value)</code>,
with the only exception of the <code>data</code> attribute.
In such case, you can pass along any rich value including arrays or objects.

<h4 id="hyperhtml-handling-events">Handling events</h4>

hyperHTML is compatible with DOM Level 3 events.
This includes the ability to use both functions and even
objects implementing the <a href="https://dom.spec.whatwg.org/#callbackdef-eventlistener">EventListener interface</a>.<br>

With HyperHTMLElement there are <a href="https://github.com/WebReflection/hyperHTML-Element#the-class">3 extra patterns</a> to set events: based on automatically available <code>handleEvent</code> interface,
a declarative <code>data-call</code>, and a Preact<i>ish</i> style
with lazily bound <code>handleClick</code> methods and friends.