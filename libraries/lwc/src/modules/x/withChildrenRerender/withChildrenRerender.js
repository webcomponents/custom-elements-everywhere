import { LightningElement } from 'lwc';

export default class extends LightningElement {
    renderedOnce = false;

    count = 1;

    renderedCallback() {
        if (!this.renderedOnce) {
            this.renderedOnce = true;
            this.count += 1;
        }
    }
}
