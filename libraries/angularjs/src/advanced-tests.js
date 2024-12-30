import prodApp from "./app.module";

import tests from 'advanced-tests';

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
    renderComponentWithProperties() {
      return render('<comp-with-props>')
    },
    renderComponentWithDeclarativeEvent() {
      const { wc, root } = render('<comp-with-declarative-event>');
      function click() {
        wc.click();
        scope.$digest();
      }
      return { wc, click, root };
    }
  });
});
