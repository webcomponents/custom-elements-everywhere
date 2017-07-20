import { Component, OnInit, OnDestroy } from '@angular/core';
import 'ce-without-children';
import 'ce-with-children';

@Component({
  template: `
    <div>
      <ce-without-children id="wc"></ce-without-children>
    </div>
  `
})
export class ComponentWithoutChildren {
}

@Component({
  template: `
    <div>
      <ce-with-children id="wc"></ce-with-children>
    </div>
  `
})
export class ComponentWithChildren {
}

@Component({
  template: `
    <div>
      <ce-with-children id="wc">{{count}}</ce-with-children>
    </div>
  `
})
export class ComponentWithChildrenRerender implements OnInit, OnDestroy {
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

@Component({
  template: `
    <ce-with-children id="wc" *ngIf="showWC; else elseBlock"></ce-with-children>
    <ng-template #elseBlock><div id="dummy">Dummy view</div></ng-template>
  `
})
export class ComponentWithDifferentViews {
  showWC = true;
  toggle() {
    this.showWC = !this.showWC;
  }
}
