import { LightningElement } from 'lwc';

export default class extends LightningElement {
    lowercaseHandled = false;
    kebabHandled = false;
    camelHandled = false;
    capsHandled = false;
    pascalHandled = false;

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
}
