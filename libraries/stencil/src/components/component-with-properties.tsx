import { Component, Host, h, Prop } from "@stencil/core";

import 'wc/ce-with-properties';

@Component({
  tag: "component-with-properties",
  shadow: true
})
export class ComponentWithProperties {
  @Prop() bool = true;
  @Prop() num = 42;
  @Prop() str = "custom";
  @Prop() arr = ['c', 'u', 's', 't', 'o', 'm'];
  @Prop() obj = {org: 'webcomponents', repo: 'custom-elements-everywhere'};
  @Prop() camelCaseObj = { label: "passed" };

  render() {
    return (
      <Host>
        <ce-with-properties
          id="ce-with-properties"
          bool={this.bool}
          num={this.num}
          str={this.str}
          arr={this.arr}
          obj={this.obj}
          camelCaseObj={this.camelCaseObj}
        ></ce-with-properties>
      </Host>
    );
  }
}
