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

export {
  ComponentWithoutChildren,
  ComponentWithChildren,
  ComponentWithChildrenRerender,
  ComponentWithDifferentViews
}
