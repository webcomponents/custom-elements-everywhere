import { Component, State } from "@stencil/core";

@Component({
  tag: "component-with-declarative-event"
})
export class ComponentWithDeclarativeEvent {
  @State() lowercaseHandled: boolean = false;
  @State() kebabHandled: boolean = false;
  @State() camelHandled: boolean = false;
  @State() capsHandled: boolean = false;
  @State() pascalHandled: boolean = false;

  handleLowercaseEvent() {
    this.lowercaseHandled = true;
  }
  handleKebabEvent() {
    this.kebabHandled = true;
  }
  handleCamelEvent() {
    this.camelHandled = true;
  }
  handleCapsEvent() {
    this.capsHandled = true;
  }
  handlePascalEvent() {
    this.pascalHandled = true;
  }

  render() {
    return (
      <div>
        <div>{this.lowercaseHandled.toString()}</div>
        <div>{this.kebabHandled.toString()}</div>
        <div>{this.camelHandled.toString()}</div>
        <div>{this.capsHandled.toString()}</div>
        <div>{this.pascalHandled.toString()}</div>
        <ce-with-event
          onlowercaseevent={this.handleLowercaseEvent.bind(this)}
          onkebab-event={this.handleKebabEvent.bind(this)}
          oncamelEvent={this.handleCamelEvent.bind(this)}
          onCAPSEvent={this.handleCapsEvent.bind(this)}
          onPascalEvent={this.handlePascalEvent.bind(this)}
        />
      </div>
    );
  }
}
