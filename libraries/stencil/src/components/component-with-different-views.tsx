import { Component, Host, h, Method, Prop } from "@stencil/core";

import 'wc/ce-with-children';

@Component({
  tag: "component-with-different-views",
  shadow: true
})
export class ComponentWithDifferentViews {
  @Prop({ mutable: true }) showWC = true;

  @Method()
  toggle() {
    this.showWC = !this.showWC;
  }

  render() {
    return (
      <Host>
        <div id="ce-with-different-views">
            <button onClick={() => this.toggle()}>Toggle views</button>
            {this.showWC ? (
              <ce-with-children id="wc"></ce-with-children>
            ) : (
              <div>Dummy view</div>
            )}
        </div>
      </Host>
    );
  }
}
