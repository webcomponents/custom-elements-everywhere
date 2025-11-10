import { Component, Host, h } from "@stencil/core";

import "wc/ce-without-children"

@Component({
  tag: "component-without-children",
  shadow: true
})
export class ComponentWithoutChildren {
  render() {
    return (
      <Host>
        <ce-without-children id="ce-without-children"></ce-without-children>
      </Host>
    );
  }
}
