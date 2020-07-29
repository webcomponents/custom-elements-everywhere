import { AutonomousCustomElement, h, Attribute, LSCustomElement } from '@lsegurado/ls-element/dist';
import 'ce-with-properties';

@AutonomousCustomElement()
export class ComponentWithProperties extends HTMLElement implements LSCustomElement {
  @Attribute() bool = true;
  @Attribute() num = 42;
  @Attribute() str = "LS-Element";
  @Attribute() arr = ["L", "S", "-", "E", "l", "e", "m", "e", "n", "t"];
  @Attribute() obj = { org: "lsegurado", repo: "ls-element" };

  render() {
    return (
      <ce-with-properties
        id="wc"
        bool={this.bool}
        num={this.num}
        str={this.str}
        arr={this.arr}
        obj={this.obj}
      ></ce-with-properties>
    );
  }
}