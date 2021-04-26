<h4 id="solid-handling-data">Handling data</h4>

Solid passes all non-JSX expression data as attributes. JSX expressions default to attributes they are booleans, applied to a custom element, or indicated with `prop:` namespace.

<h4 id="solid-handling-events">Handling events</h4>

By default, typical "on_____" event handlers are registered in Solid using semi-synthetic event delegation using `<div onClick={...}></div>`. However, it uses a heuristic to convert these delegated events syntax into event names, and always lowercases the events. In addition, Custom events from the Shadow DOM must be composed to work with event delegation.

For all other custom events, Solid uses its "on" binding: `<div on:my-custom-event={...}></div>`.
