import { LightningElement } from "lwc";

export default class extends LightningElement {
    bool = true;
    num = 42;
    str = 'lwc';
    arr = ['L', 'W', 'C'];
    obj = { org: 'salesforce', repo: 'lwc' };
    camelCaseObj = { label: 'passed' };
}
