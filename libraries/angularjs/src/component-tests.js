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

describe('with children', () => {
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

  it('can display a Custom Element with children in a Shadow Root', () => {
    const root = prep('<comp-with-children>');
    let wc = root.querySelector('#wc');
    expectHasChildren(wc);
  });

  it('can display a Custom Element with children in a Shadow Root and pass in Light DOM children', () => {
    const root = prep('<comp-with-children-rerender>');
    interval.flush(1000);
    let wc = root.querySelector('#wc');
    expectHasChildren(wc);
    expect(wc.textContent.includes('2')).toEqual(true);
  });

  it('can display a Custom Element with children in a Shadow Root and handle hiding and showing the element', () => {
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

describe('attributes and properties', () => {
  let wc;
  beforeEach(() => {
    const comp = compile('<comp-with-props>')(scope);
    wc = comp[0].querySelector('#wc');
  });
  it('will pass boolean data as either an attribute or a property', () => {
    let data = wc.bool || wc.hasAttribute('bool');
    expect(data).toBe(true);
    // Extra test to see if AngularJS just left its binding syntax on
    // the attribute and didn't actually set anything :P
    if (!wc.bool) {
      data = wc.getAttribute('bool');
      expect(data.includes('{{')).toBe(false);
    }
  });

  it('will pass numeric data as either an attribute or a property', () => {
    let data = wc.num || wc.getAttribute('num');
    expect(data).toEqual(42);
  });

  it('will pass string data as either an attribute or a property', () => {
    let data = wc.str || wc.getAttribute('str');
    expect(data).toEqual('Angular');
  });

  it('will pass array data as a property', () => {
    let data = wc.arr;
    expect(data).toEqual(['A', 'n', 'g', 'u', 'l', 'a', 'r']);
  });

  it('will pass object data as a property', () => {
    let data = wc.obj;
    expect(data).toEqual({ org: 'angular', repo: 'angular' });
  });
});
describe('events', () => {
  it('can imperatively listen to a DOM event dispatched by a Custom Element', () => {
    const root = compile('<comp-with-imperative-event>')(scope)[0];
    scope.$digest();
    let wc = root.querySelector('#wc');
    let handled = root.querySelector('#handled');
    expect(handled.textContent).toEqual('false');
    wc.click();
    scope.$digest();
    expect(handled.textContent).toEqual('true');
  });

  it('can declaratively listen to a lowercase DOM event dispatched by a Custom Element', () => {
    const root = compile('<comp-with-declarative-event>')(scope)[0];
    scope.$digest();
    let wc = root.querySelector('#wc');
    let handled = root.querySelector('#lowercase');
    expect(handled.textContent).toEqual('false');
    wc.click();
    scope.$digest();
    expect(handled.textContent).toEqual('true');
  });

  it('can declaratively listen to a kebab-case DOM event dispatched by a Custom Element', () => {
    const root = compile('<comp-with-declarative-event>')(scope)[0];
    scope.$digest();
    let wc = root.querySelector('#wc');
    let handled = root.querySelector('#kebab');
    expect(handled.textContent).toEqual('false');
    wc.click();
    scope.$digest();
    expect(handled.textContent).toEqual('true');
  });

  it('can declaratively listen to a camelCase DOM event dispatched by a Custom Element', () => {
    const root = compile('<comp-with-declarative-event>')(scope)[0];
    scope.$digest();
    let wc = root.querySelector('#wc');
    let handled = root.querySelector('#camel');
    expect(handled.textContent).toEqual('false');
    wc.click();
    scope.$digest();
    expect(handled.textContent).toEqual('true');
  });

  it('can declaratively listen to a CAPScase DOM event dispatched by a Custom Element', () => {
    const root = compile('<comp-with-declarative-event>')(scope)[0];
    scope.$digest();
    let wc = root.querySelector('#wc');
    let handled = root.querySelector('#caps');
    expect(handled.textContent).toEqual('false');
    wc.click();
    scope.$digest();
    expect(handled.textContent).toEqual('true');
  });

  it('can declaratively listen to a PascalCase DOM event dispatched by a Custom Element', () => {
    const root = compile('<comp-with-declarative-event>')(scope)[0];
    scope.$digest();
    let wc = root.querySelector('#wc');
    let handled = root.querySelector('#pascal');
    expect(handled.textContent).toEqual('false');
    wc.click();
    scope.$digest();
    expect(handled.textContent).toEqual('true');
  });
});
