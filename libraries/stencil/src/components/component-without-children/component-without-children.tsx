import { Component, Host, h } from "@stencil/core";

@Component({
  tag: "component-without-children",
  shadow: true
})
export class ComponentWithoutChildren {
  render() {
    return (
      <Host>
        <ce-without-children id="wc"></ce-without-children>
      </Host>
    );
  }
}
