import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'component-with-declarative-event',
  shadow: true
})
export class ComponentWithDeclarativeEvent {

  @Prop() lowercaseHandled = false;
  @Prop() kebabHandled = false;
  @Prop() camelHandled = false;
  @Prop() capsHandled = false;
  @Prop() pascalHandled = false;

  render() {
    return (
      <Host>
        <div id="lowercase">{this.lowercaseHandled.toString()}</div>
         <div id="kebab">{this.kebabHandled.toString()}</div>
        <div id="camel">{this.camelHandled.toString()}</div>
        <div id="caps">{this.capsHandled.toString()}</div>
        <div id="pascal">{this.pascalHandled.toString()}</div>
        <ce-with-event id="wc"
          onlowercaseevent={_ => this.lowercaseHandled = true}
          onkebab-event={_ => this.kebabHandled = true}
          oncamelEvent={_ => this.camelHandled = true}
          onCAPSevent={_ => this.capsHandled = true}
          onPascalEvent={_ => this.pascalHandled = true}
        ></ce-with-event> 
      </Host>
    );
  }
}
