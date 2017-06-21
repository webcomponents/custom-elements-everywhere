import { Component, OnInit, OnDestroy } from '@angular/core';
import './counters';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  count = 1;
  interval = undefined;
  ngOnInit() {
    this.interval = setInterval(() =>
      this.count += 1, 1000);
  }
  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
