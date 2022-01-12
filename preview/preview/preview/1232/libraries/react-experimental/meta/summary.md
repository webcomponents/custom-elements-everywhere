<h4 id="react-experimental-overview">Experimental</h4>

The @experimental release of React features full support for Custom Elements, but the React core team has not yet reached a final decision on whether this will make it into React 18. Your feedback is important, and will be helpful for making this decision. More info at https://github.com/facebook/react/issues/11347#issuecomment-988970952

<h4 id="react-experimental-handling-data">Handling data</h4>

React@experimental, as of December 2021, uses a runtime heuristic to determine if it should pass data to Custom Elements as either properties or attributes. If a property is already defined on the element instance, it will use properties, otherwise it will fallback to attributes.

<h4 id="react-experimental-handling-events">Handling events</h4>

React@experimental, as of December 2021, will register an event listener on any custom element when binding a function to a property whose name begins with <code>on</code>.  It supports lowercase, camelCase, kebab-case, CAPScase, and PascalCase events.