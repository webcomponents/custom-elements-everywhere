import { LightningElement } from 'lwc';

export default class extends LightningElement {
    showWC = true;

    handleClick() {
        this.showWC = !this.showWC;
    }
}
