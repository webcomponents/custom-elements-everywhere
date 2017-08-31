import 'ce-without-children';
import 'ce-with-children';
import 'ce-with-properties';
import 'ce-with-event';

const ComponentWithoutChildren = {
  template: `
    <div>
      <ce-without-children id="wc"></ce-without-children>
    </div>
    `
};

const ComponentWithChildren = {
  template: `
    <div>
      <ce-with-children id="wc"></ce-with-children>
    </div>
  `
};

const ComponentWithChildrenRerender = {
  template: `
    <div>
      <ce-with-children id="wc">{{$ctrl.count}}</ce-with-children>
    </div>
    `,
  controller: class {
    constructor($interval) {
      angular.extend(this, { $interval });
    }
    $onInit() {
      this.count = 1;
      this.interval = this.$interval(() => {
        this.count++;
      }, 1000);
    }
    $onDestroy() {
      this.$interval.cancel(this.interval);
    }
  }
}

const ComponentWithDifferentViews = {
  template: `
    <div>
      <ce-with-children id="wc" ng-if="$ctrl.showWc"></ce-with-children>
      <div id="dummy" ng-if="!$ctrl.showWc">Dummy view</div>
    </div>
  `,
  bindings: {
    showWc: '<'
  }
}

const ComponentWithProps = {
  template: `
    <div>
      <ce-with-properties id="wc"
        bool="{{$ctrl.bool}}"
        num="{{$ctrl.num}}"
        str="{{$ctrl.str}}"
        arr="{{$ctrl.arr}}"
        obj="{{$ctrl.obj}}"
      ></ce-with-properties>
    </div>
  `,
  controller: class {
    constructor() {}
    $onInit() {
      this.data = {
        bool: true,
        num: 42,
        str: 'Angular',
        arr: ['A', 'n', 'g', 'u', 'l', 'a', 'r'],
        obj: { org: 'angular', repo: 'angular' }
      };
    }
  }
};

const ComponentWithImperativeEvent = {
  template: `
    <div>
      <div id="handled">{{$ctrl.eventHandled}}</div>
      <ce-with-event id="wc"></ce-with-event>
    </div>
  `,
  controller: class {
    constructor($element) {
      angular.extend(this, { $element });
    }
    $onInit() {
      this.eventHandled = false;
      this.handleTestEvent = this.handleTestEvent.bind(this);
      this.$element.find('ce-with-event')
        .on('camelEvent', this.handleTestEvent);
    }
    handleTestEvent() {
      this.eventHandled = true;
    }
  }
};

const ComponentWithDeclarativeEvent = {
  template: `
    <div>
      <div id="lowercase">{{$ctrl.lowercaseHandled}}</div>
      <div id="kebab">{{$ctrl.kebabHandled}}</div>
      <div id="camel">{{$ctrl.camelHandled}}</div>
      <div id="caps">{{$ctrl.capsHandled}}</div>
      <div id="pascal">{{$ctrl.pascalHandled}}</div>
      <ce-with-event id="wc"
        on-lowercaseevent="$ctrl.handleLowercaseEvent()"
        on-kebab-event="$ctrl.handleKebabEvent()"
        on-camelEvent="$ctrl.handleCamelEvent()"
        on-CAPSevent="$ctrl.handleCapsEvent()"
        on-PascalEvent="$ctrl.handlePascalEvent()"
      ></ce-with-event>
    </div>
  `,
  controller: class {
    constructor() {}
    $onInit() {
      this.lowercaseHandled = false;
      this.kebabHandled = false;
      this.camelHandled = false;
      this.capsHandled = false;
      this.pascalHandled = false;
    }
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
};

export {
  ComponentWithoutChildren,
  ComponentWithChildren,
  ComponentWithChildrenRerender,
  ComponentWithDifferentViews,
  ComponentWithProps,
  ComponentWithImperativeEvent,
  ComponentWithDeclarativeEvent
}
