import { Component, Host, h, Prop } from "@stencil/core";

import 'wc/ce-with-event';

@Component({
  tag: "component-with-declarative-event",
  shadow: true
})
export class ComponentWithDeclarativeEvent {
  @Prop({ mutable: true }) lowercaseHandled = false;
  @Prop({ mutable: true }) kebabHandled = false;
  @Prop({ mutable: true }) camelHandled = false;
  @Prop({ mutable: true }) capsHandled = false;
  @Prop({ mutable: true }) pascalHandled = false;

  render() {
    return (
      <Host>
        <div>lowercase: {this.lowercaseHandled.toString()}</div>
        <div>kebab-case: {this.kebabHandled.toString()}</div>
        <div>camelCase: {this.camelHandled.toString()}</div>
        <div>CAPScase: {this.capsHandled.toString()}</div>
        <div>PascalCase: {this.pascalHandled.toString()}</div>
        <ce-with-event
          id="ce-with-declarative-event"
          on-lowercaseevent={_ => (this.lowercaseHandled = true)}
          on-kebab-event={_ => (this.kebabHandled = true)}
          on-camelEvent={_ => (this.camelHandled = true)}
          on-CAPSevent={_ => (this.capsHandled = true)}
          on-PascalEvent={_ => (this.pascalHandled = true)}
        >Declarative</ce-with-event>
      </Host>
    );
  }
}
