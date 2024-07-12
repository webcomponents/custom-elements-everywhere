<h4 id="surplus-handling-data">Handling data</h4>

Surplus passes data to an element via properties unless the indicated field is 
known to be available only as an attribute (`aria-*`, some SVG attributes). 

<h4 id="surplus-handling-events">Handling events</h4>

By default, event handlers are registered in Surplus by setting the `node.on...` DOM properties: 
`<div onclick={...}></div>`. For custom events, which don't have such properties, Surplus uses 
[surplus-mixin-on](https://github.com/adamhaile/surplus-mixin-on): `<div fn={on('my-custom-event', ...)}></div>`.
