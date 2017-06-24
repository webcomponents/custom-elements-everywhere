import { Component } from '@angular/core';
import './webcomponents/xfoo';

@Component({
  selector: 'app-root',
  template: `
    <h1>{{title}}</h1>
    <x-foo></x-foo>
  `
})
export class AppComponent {
  title = 'Hello World';
}
