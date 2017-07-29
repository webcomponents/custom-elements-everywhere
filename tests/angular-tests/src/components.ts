import { Component, OnInit, OnDestroy } from '@angular/core';
import 'ce-without-children';
import 'ce-with-children';
import 'ce-with-properties';
import 'ce-with-event';

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

@Component({
  template: `
    <div>
      <ce-with-properties id="wc"
        [bool]="data.bool"
        [num]="data.num"
        [str]="data.str"
        [arr]="data.arr"
        [obj]="data.obj"
      ></ce-with-properties>
    </div>
  `
})
export class ComponentWithProperties {
  data = {
    bool: true,
    num: 42,
    str: 'Angular',
    arr: ['A', 'n', 'g', 'u', 'l', 'a', 'r'],
    obj: { org: 'angular', repo: 'angular' }
  }
}

@Component({
  template: `
    <div>
      <ce-unregistered id="wc"
        [attr.bool]="data.bool"
        [attr.num]="data.num"
        [attr.str]="data.str"
        [arr]="data.arr"
        [obj]="data.obj"
      ></ce-unregistered>
    </div>
  `
})
export class ComponentWithUnregistered {
  data = {
    bool: true,
    num: 42,
    str: 'Angular',
    arr: ['A', 'n', 'g', 'u', 'l', 'a', 'r'],
    obj: { org: 'angular', repo: 'angular' }
  }
}

@Component({
  template: `
    <div>
      <div id="lowercase">{{lowercaseHandled}}</div>
      <div id="kebab">{{kebabHandled}}</div>
      <div id="camel">{{camelHandled}}</div>
      <div id="caps">{{capsHandled}}</div>
      <div id="pascal">{{pascalHandled}}</div>
      <ce-with-event id="wc"
        (lowercaseevent)="handleLowercaseEvent()"
        (kebab-event)="handleKebabEvent()"
        (camelEvent)="handleCamelEvent()"
        (CAPSevent)="handleCapsEvent()"
        (PascalEvent)="handlePascalEvent()"
      ></ce-with-event>
    </div>
  `
})
export class ComponentWithEvent {
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
