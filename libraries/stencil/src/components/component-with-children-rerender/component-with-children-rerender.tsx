import { Component, Host, h, Prop } from "@stencil/core";

@Component({
  tag: "component-with-children-rerender",
  shadow: true
})
export class ComponentWithChildrenRerender {
  @Prop({ mutable: true }) count = 1;

  componentDidLoad() {
    Promise.resolve().then(_ => this.count++);
  }

  render() {
    return (
      <Host>
        <ce-with-children id="wc">{this.count}</ce-with-children>
      </Host>
    );
  }
}
