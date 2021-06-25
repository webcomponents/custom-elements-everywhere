import { AutonomousCustomElement, h, Attribute, LSCustomElement } from '@lsegurado/ls-element/dist';
import 'ce-with-event';

@AutonomousCustomElement()
export class ComponentWithDeclarativeEvent extends HTMLElement implements LSCustomElement {
  @Attribute() lowercaseHandled = false;
  @Attribute() kebabHandled = false;
  @Attribute() camelHandled = false;
  @Attribute() capsHandled = false;
  @Attribute() pascalHandled = false;

  render() {
    return (
      <>
        <div id="lowercase">{this.lowercaseHandled.toString()}</div>
        <div id="kebab">{this.kebabHandled.toString()}</div>
        <div id="camel">{this.camelHandled.toString()}</div>
        <div id="caps">{this.capsHandled.toString()}</div>
        <div id="pascal">{this.pascalHandled.toString()}</div>
        <ce-with-event
          id="wc"
          onlowercaseevent={_ => (this.lowercaseHandled = true)}
          onkebab-event={_ => (this.kebabHandled = true)}
          oncamelEvent={_ => (this.camelHandled = true)}
          onCAPSevent={_ => (this.capsHandled = true)}
          onPascalEvent={_ => (this.pascalHandled = true)}
        ></ce-with-event>
      </>
    );
  }
}