import { Component, Host, h } from "@stencil/core";

import 'wc/ce-with-children';

@Component({
  tag: "component-with-children",
  shadow: true
})
export class ComponentWithChildren {
  render() {
    return (
      <Host>
        <ce-with-children id="ce-with-children"></ce-with-children>
      </Host>
    );
  }
}
