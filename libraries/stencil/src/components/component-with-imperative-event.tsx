import { Component, Host, h, Prop } from "@stencil/core";

import "wc/ce-with-event";

@Component({
  tag: "component-with-imperative-event",
  shadow: true
})
export class ComponentWithImperativeEvent {
  @Prop({ mutable: true }) eventHandled = false;

  customEl!: HTMLElement;

  componentDidLoad() {
    this.customEl.addEventListener(
      "camelEvent",
      () => (this.eventHandled = true)
    );
  }

  render() {
    return (
      <Host>
        <div id="ce-with-imperative-event-handled">{this.eventHandled.toString()}</div>
        <ce-with-event id="ce-with-imperative-event" ref={el => (this.customEl = el)}>Imperative</ce-with-event>
      </Host>
    );
  }
}
