<h4 id="solid-handling-data">Handling data</h4>

Solid passes all non-JSX expression data as attributes. JSX expressions default to attributes unless they are booleans, applied to a custom element, or indicated with `prop:` namespace.

<h4 id="solid-handling-events">Handling events</h4>

By default, typical "on_____" event handlers are registered in Solid using `<div onClick={...}></div>`. However, it always lowercases the event names and does automatic event delegation for input and mouse events.

For custom events with non-standard names, Solid uses its "on" binding: `<div on:my-custom-event={...}></div>`.
