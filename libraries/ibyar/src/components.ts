

import 'ce-without-children';
import 'ce-with-children';
import 'ce-with-properties';
import 'ce-with-event';
import { Component, HostListener, isModel } from '@ibyar/aurora';

@Component({
  selector: 'component-without-children',
  template: `
    <div>
      <ce-without-children id="wc"></ce-without-children>
    </div>
  `
})
export class ComponentWithoutChildren {
}

@Component({
  selector: 'component-with-children',
  shadowDomMode: 'closed',
  template: `
    <div>
      <ce-with-children id="wc"></ce-with-children>
    </div>
  `
})
export class ComponentWithChildren {
}

@Component({
  selector: 'component-with-children-rerender',
  shadowDomMode: 'open',
  template: `
    <div>
      <ce-with-children id="wc">{{count}}</ce-with-children>
    </div>
  `
})
export class ComponentWithChildrenRerender {
  count = 1;
  interval = undefined;

  updateCount(){
    return Promise.resolve().then(() => {
      this.count += 1;
      if (isModel(this)) {
				this.emitChangeModel('count');
			}
    });
  }
}

@Component({
  selector: 'component-with-different-views',
  template: `
    <ce-with-children id="wc" *if="showWC"></ce-with-children>
    <div id="dummy" *if="!showWC" >Dummy view</div>
  `
})
export class ComponentWithDifferentViews {
  showWC = true;
  toggle() {
    this.showWC = !this.showWC;
    if (isModel(this)) {
      this.emitChangeModel('showWC');
    }
  }
}

@Component({
  selector: 'component-with-properties',
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
    str: 'Aurora',
    arr: ['I', 'b', 'y', 'a', 'r'],
    obj: { org: 'ibyar', repo: 'ibyar' }
  }
}

@Component({
  selector: 'component-with-unregistered',
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
    str: 'Aurora',
    arr: ['I', 'b', 'y', 'a', 'r'],
  }
}

@Component({
  selector: 'component-with-imperative-event',
  template: `
    <div>
      <div id="handled">{{eventHandled}}</div>
      <ce-with-event #customEl id="wc"></ce-with-event>
    </div>
  `
})
export class ComponentWithImperativeEvent {
  
  eventHandled = false;
  
  @HostListener('customEl:camelEvent')
  handleTestEvent() {    
    this.eventHandled = true;
    if (isModel(this)) {
      this.emitChangeModel('eventHandled');
    }
  }

}

@Component({
  selector: 'component-with-declarative-event',
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
export class ComponentWithDeclarativeEvent {
  lowercaseHandled = false;
  kebabHandled = false;
  camelHandled = false;
  capsHandled = false;
  pascalHandled = false;
  handleLowercaseEvent() {
    this.lowercaseHandled = true;
    if (isModel(this)) {
      this.emitChangeModel('lowercaseHandled');
    }
  }
  handleKebabEvent() {
    this.kebabHandled = true;
    if (isModel(this)) {
      this.emitChangeModel('kebabHandled');
    }
  }
  handleCamelEvent() {
    this.camelHandled = true;
    if (isModel(this)) {
      this.emitChangeModel('camelHandled');
    }
  }
  handleCapsEvent() {
    this.capsHandled = true;
    if (isModel(this)) {
      this.emitChangeModel('capsHandled');
    }
  }
  handlePascalEvent() {
    this.pascalHandled = true;
    if (isModel(this)) {
      this.emitChangeModel('pascalHandled');
    }
  }
}
