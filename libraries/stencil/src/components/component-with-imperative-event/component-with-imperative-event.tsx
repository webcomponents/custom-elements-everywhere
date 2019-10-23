import { Component, Host, h, Prop } from "@stencil/core";

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
        <div id="handled">{this.eventHandled.toString()}</div>
        <ce-with-event id="wc" ref={el => (this.customEl = el)}></ce-with-event>
      </Host>
    );
  }
}
