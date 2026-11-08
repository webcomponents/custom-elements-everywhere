<h4 id="ecopages-handling-data">Handling data</h4>

Ecopages JSX passes non-expression values as attributes. JSX expressions on custom elements default to property bindings unless the name is in the attribute-default set (`id`, `class`, `style`, and similar) or you use the `prop:` prefix for an explicit property binding.

<h4 id="ecopages-handling-events">Handling events</h4>

Native DOM events can use `on-native:` bindings. Custom events with non-standard names use the `on:` namespace, for example `<ce-with-event on:my-custom-event={handler} />`, rather than React-style `onClick` heuristics.
