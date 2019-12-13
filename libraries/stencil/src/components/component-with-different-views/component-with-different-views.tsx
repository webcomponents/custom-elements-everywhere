import { Component, Host, h, Method, Prop } from "@stencil/core";

@Component({
  tag: "component-with-different-views",
  shadow: true
})
export class ComponentWithDifferentViews {
  @Prop({ mutable: true }) showWC = true;

  @Method()
  async toggle() {
    this.showWC = !this.showWC;
  }

  render() {
    return (
      <Host>
        {this.showWC ? (
          <ce-with-children id="wc"></ce-with-children>
        ) : (
          <div id="dummy">Dummy view</div>
        )}
      </Host>
    );
  }
}
