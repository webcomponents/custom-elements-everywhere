import "ce-without-children";
import "ce-with-children";
import "ce-with-properties";
import "ce-with-event";
import {
  ComponentWithChildren,
  ComponentWithChildrenRerender,
  ComponentWithDeclarativeEvent,
  ComponentWithDifferentViews,
  ComponentWithImperativeEvent,
  ComponentWithProperties,
  ComponentWithoutChildren
} from "../dist/module";

customElements.define("component-without-children", ComponentWithoutChildren);
customElements.define("component-with-children", ComponentWithChildren);
customElements.define(
  "component-with-children-rerender",
  ComponentWithChildrenRerender
);
customElements.define(
  "component-with-different-views",
  ComponentWithDifferentViews
);
customElements.define(
  "component-with-imperative-event",
  ComponentWithImperativeEvent
);
customElements.define(
  "component-with-declarative-event",
  ComponentWithDeclarativeEvent
);
customElements.define("component-with-properties", ComponentWithProperties);
