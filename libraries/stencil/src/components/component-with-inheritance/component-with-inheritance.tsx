import { Component, Host, h, Prop } from "@stencil/core";

@Component({
  tag: "component-with-inheritance",
  shadow: true
})
export class ComponentWithInheritance {
  @Prop() bool = true;
  @Prop() num = 42;
  @Prop() str = "Stencil";
  @Prop() arr = ["S", "t", "e", "n", "c", "i", "l"];
  @Prop() obj = { org: "Ionic", repo: "stencil" };
  @Prop() camelCaseObj = { label: "passed" };

  render() {
    return (
      <Host>
        <ce-with-inheritance
          id="wc"
          bool={this.bool}
          num={this.num}
          str={this.str}
          arr={this.arr}
          obj={this.obj}
          camelCaseObj={this.camelCaseObj}
        ></ce-with-inheritance>
      </Host>
    );
  }
}
