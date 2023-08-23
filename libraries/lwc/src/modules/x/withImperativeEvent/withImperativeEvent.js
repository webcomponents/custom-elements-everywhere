import { LightningElement } from 'lwc';

export default class extends LightningElement {
    renderedOnce = false;

    eventHandled = false;

    renderedCallback() {
        if (!this.renderedOnce) {
            this.renderedOnce = true;
            this.refs.wc.addEventListener('camelEvent', () => {
                this.eventHandled = true;
            });
        }
    }
}
