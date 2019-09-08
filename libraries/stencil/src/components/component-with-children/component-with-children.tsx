import { Component, Host, h } from "@stencil/core";

@Component({
  tag: "component-with-children",
  shadow: true
})
export class ComponentWithChildren {
  render() {
    return (
      <Host>
        <ce-with-children id="wc"></ce-with-children>
      </Host>
    );
  }
}
