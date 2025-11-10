import { ComponentWithChildren } from "../build/component-with-children.js";
import { ComponentWithChildrenRerender } from "../build/component-with-children-rerender.js";
import { ComponentWithDeclarativeEvent } from "../build/component-with-declarative-event.js";
import { ComponentWithDifferentViews } from "../build/component-with-different-views.js";
import { ComponentWithImperativeEvent } from "../build/component-with-imperative-event.js";
import { ComponentWithProperties } from "../build/component-with-properties.js";
import { ComponentWithoutChildren } from "../build/component-without-children.js";

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
