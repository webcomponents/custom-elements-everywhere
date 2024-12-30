import {expect} from "chai";
import prodApp from "./app.module";

import tests from 'basic-tests';

describe('', function () {
  beforeEach(angular.mock.module(prodApp));

  let compile;
  let scope;
  let interval;

  beforeEach(
    inject(($compile, $rootScope, $interval) => {
      compile = $compile;
      scope = $rootScope;
      interval = $interval;
    })
  );

  function render(component) {
    const root = compile(component)(scope)[0];
    scope.$apply();
    const wc = root.querySelector('#wc');
    return { wc, root }
  }

  tests({
    renderComponentWithoutChildren() {
      return render('<comp-no-children>')
    },
    renderComponentWithChildren() {
      return render('<comp-with-children>')
    },
    renderComponentWithChildrenRerender() {
      const result = render('<comp-with-children-rerender>');
      interval.flush(1000);
      return result;
    },
    renderComponentWithDifferentViews() {
      scope.showWc = true;
      const { wc, root } = render('<comp-with-different-views show-wc="showWc">');

      function toggle() {
        scope.showWc = !scope.showWc;
        scope.$apply();
      }

      return { wc, toggle, root }
    },
    renderComponentWithProperties() {
      return render('<comp-with-props>')
    },
    renderComponentWithImperativeEvent() {
      const { wc, root } = render('<comp-with-imperative-event>');
      function click() {
        wc.click();
        scope.$digest();
      }
      return { wc, click, root };
    }
  });
});
