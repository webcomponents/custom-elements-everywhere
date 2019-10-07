import { Component, Host, h, Prop } from "@stencil/core";

@Component({
  tag: "component-with-properties",
  shadow: true
})
export class ComponentWithProperties {
  @Prop() bool = true;
  @Prop() num = 42;
  @Prop() str = "Stencil";
  @Prop() arr = ["S", "t", "e", "n", "c", "i", "l"];
  @Prop() obj = { org: "Ionic", repo: "stencil" };

  render() {
    return (
      <Host>
        <ce-with-properties
          id="wc"
          bool={this.bool}
          num={this.num}
          str={this.str}
          arr={this.arr}
          obj={this.obj}
        ></ce-with-properties>
      </Host>
    );
  }
}
