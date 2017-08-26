import expect from 'expect';
import prodApp from './app.module';

beforeEach(angular.mock.module(prodApp));

let compile;
let scope;
let interval;
beforeEach(inject(($compile, $rootScope, $interval) => {
  compile = $compile;
  scope = $rootScope.$new();
  interval = $interval;
}));

describe('no children', () => {
  it('can display a CE with no children', () => {
    const comp = compile('<comp-no-children>')(scope);
    const wc = (comp[0].querySelector('ce-without-children'));
    expect(wc).toExist();
  });
});

describe('with children', function() {
  const prep = (el) => {
    return compile(el)(scope)[0];
  };
  function expectHasChildren(wc) {
    expect(wc).toExist();
    let shadowRoot = wc.shadowRoot;
    let heading = shadowRoot.querySelector('h1');
    expect(heading).toExist();
    expect(heading.textContent).toEqual('Test h1');
    let paragraph = shadowRoot.querySelector('p');
    expect(paragraph).toExist();
    expect(paragraph.textContent).toEqual('Test p');
  }

  it('can display a Custom Element with children in a Shadow Root', function() {
    const root = prep('<comp-with-children>');
    let wc = root.querySelector('#wc');
    expectHasChildren(wc);
  });

  it.only('can display a Custom Element with children in a Shadow Root and pass in Light DOM children', () => {
    const root = prep('<comp-with-children-rerender>');
    interval.flush(1000);
    let wc = root.querySelector('#wc');
    expectHasChildren(wc);
    expect(wc.textContent.includes('2')).toEqual(true);
  });

  it.only('can display a Custom Element with children in a Shadow Root and handle hiding and showing the element', () => {
    scope.showWc = true;
    const root = prep(`<comp-with-different-views show-wc="showWc">`);
    scope.$apply();
    let wc = root.querySelector('#wc');
    expectHasChildren(wc);

    scope.showWc = false;
    scope.$apply();

    let dummy = root.querySelector('#dummy');
    expect(dummy).toExist();
    expect(dummy.textContent).toEqual('Dummy view');

    scope.showWc = true;
    scope.$apply();

    wc = root.querySelector('#wc');
    expectHasChildren(wc);
  });
});
