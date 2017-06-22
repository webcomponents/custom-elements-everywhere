import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  data = {
    boolean: true,
    number: 42,
    string: 'Angular',
    array: ['A', 'n', 'g', 'u', 'l', 'a', 'r'],
    object: { org: 'angular', repo: 'angular' },
    undefinedBoolean: true,
    undefinedNumber: 42,
    undefinedString: 'Angular',
    undefinedArray: ['A', 'n', 'g', 'u', 'l', 'a', 'r'],
    undefinedObject: { org: 'angular', repo: 'angular' },
  }
}
