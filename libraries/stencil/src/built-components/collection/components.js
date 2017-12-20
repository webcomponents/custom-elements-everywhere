export class ComponentWithDeclarativeEvent {
    constructor() {
        this.lowercaseHandled = false;
        this.kebabHandled = false;
        this.camelHandled = false;
        this.capsHandled = false;
        this.pascalHandled = false;
    }
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
        return (h("div", null,
            h("div", null, this.lowercaseHandled.toString()),
            h("div", null, this.kebabHandled.toString()),
            h("div", null, this.camelHandled.toString()),
            h("div", null, this.capsHandled.toString()),
            h("div", null, this.pascalHandled.toString()),
            h("ce-with-event", { onlowercaseevent: this.handleLowercaseEvent.bind(this), "onkebab-event": this.handleKebabEvent.bind(this), oncamelEvent: this.handleCamelEvent.bind(this), onCAPSEvent: this.handleCapsEvent.bind(this), onPascalEvent: this.handlePascalEvent.bind(this) })));
    }
}
