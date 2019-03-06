<h4 id="solid-handling-data">Handling data</h4>

Solid passes all non-JSX expression data as attributes. JSX expressions default to properties unless the indicated field is hyphenated or is known to be available only as an attribute (`aria-*`, some SVG attributes). 

<h4 id="solid-handling-events">Handling events</h4>

By default, event handlers are registered in Solid by setting the `node.on...` DOM properties for lowercase: 
`<div onclick={...}></div>` or using semi-synthetic event delegation using camelCase `<div onClick={...}></div>`. However,
it uses a heuristic to convert these delegated events syntax into event names, and always lowercases the events. In addition, Custom events from the Shadow DOM must be composed to work with event delegation.

For all other custom events, Solid uses its events binding: `<div events={{'my-custom-event': ...}}></div>`.
