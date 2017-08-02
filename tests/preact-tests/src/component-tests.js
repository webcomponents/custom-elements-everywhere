import { h, render } from 'preact';
import expect from 'expect';
import {
  ComponentWithoutChildren,
  ComponentWithChildren,
  ComponentWithChildrenRerender,
  ComponentWithDifferentViews,
  ComponentWithProperties,
  ComponentWithUnregistered,
  ComponentWithEvent
} from './components';

// Setup the test harness. This will get cleaned out with every test.
let app = document.createElement('div');
app.id = 'app';
document.body.appendChild(app);
let scratch; // This will hold the actual element under test.

beforeEach(function() {
  scratch = document.createElement('div');
  scratch.id = 'scratch';
  app.appendChild(scratch);
});

afterEach(function() {
  app.innerHTML = '';
  scratch = null;
});

describe('no children', function() {
  it('can display a Custom Element with no children', function() {
    let root = render(<ComponentWithoutChildren />, scratch);
    let wc = root.querySelector('#wc');
    expect(wc).toExist();
  });
});

describe('with children', function() {
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
    let root = render(<ComponentWithChildren />, scratch);
    let wc = root.querySelector('#wc');
    expectHasChildren(wc);
  });

  it('can display a Custom Element with children in a Shadow Root and pass in Light DOM children', async function() {
    let root = render(<ComponentWithChildrenRerender />, scratch);
    let component = root._component;
    let wc = root.querySelector('#wc');
    await Promise.resolve();
    component.forceUpdate();
    expectHasChildren(wc);
    expect(wc.textContent.includes('2')).toEqual(true);
  });

  it('can display a Custom Element with children in the Shadow DOM and handle hiding and showing the element', function() {
    let root = render(<ComponentWithDifferentViews />, scratch);
    let component = root._component;
    let wc = root.querySelector('#wc');
    expectHasChildren(wc);
    component.toggle();
    component.forceUpdate();
    let dummy = root.querySelector('#dummy');
    expect(dummy).toExist();
    expect(dummy.textContent).toEqual('Dummy view');
    component.toggle();
    component.forceUpdate();
    wc = root.querySelector('#wc');
    expectHasChildren(wc);
  });
});

describe('attributes and properties', function() {
  it('will pass boolean data as either an attribute or a property', function() {
    let root = render(<ComponentWithProperties />, scratch);
    let wc = root.querySelector('#wc');
    let data = wc.bool || wc.hasAttribute('bool');
    expect(data).toBe(true);
  });

  it('will pass numeric data as either an attribute or a property', function() {
    let root = render(<ComponentWithProperties />, scratch);
    let wc = root.querySelector('#wc');
    let data = wc.num || wc.getAttribute('num');
    expect(data).toEqual(42);
  });

  it('will pass string data as either an attribute or a property', function() {
    let root = render(<ComponentWithProperties />, scratch);
    let wc = root.querySelector('#wc');
    let data = wc.str || wc.getAttribute('str');
    expect(data).toEqual('Preact');
  });

  it('will pass array data as a property', function() {
    let root = render(<ComponentWithProperties />, scratch);
    let wc = root.querySelector('#wc');
    let data = wc.arr;
    expect(data).toEqual(['P', 'r', 'e', 'a', 'c', 't']);
  });

  it('will pass object data as a property', function() {
    let root = render(<ComponentWithProperties />, scratch);
    let wc = root.querySelector('#wc');
    let data = wc.obj;
    expect(data).toEqual({ org: 'developit', repo: 'preact' });
  });

  // it('will set boolean attributes on a Custom Element that has not already been defined and upgraded', function() {
  //   let root = render(<ComponentWithUnregistered />, scratch);
  //   let wc = root.querySelector('#wc');
  //   expect(wc.hasAttribute('bool')).toBe(true);
  // });

  // it('will set numeric attributes on a Custom Element that has not already been defined and upgraded', function() {
  //   let root = render(<ComponentWithUnregistered />, scratch);
  //   let wc = root.querySelector('#wc');
  //   expect(wc.getAttribute('num')).toEqual('42');
  // });

  // it('will set string attributes on a Custom Element that has not already been defined and upgraded', function() {
  //   let root = render(<ComponentWithUnregistered />, scratch);
  //   let wc = root.querySelector('#wc');
  //   expect(wc.getAttribute('str')).toEqual('Preact');
  // });

  // // Related:
  // // https://github.com/developit/preact/issues/678
  // // https://github.com/developit/preact/pull/511
  // it('will set array properties on a Custom Element that has not already been defined and upgraded', function() {
  //   let root = render(<ComponentWithUnregistered />, scratch);
  //   let wc = root.querySelector('#wc');
  //   expect(wc.arr).toEqual(['P', 'r', 'e', 'a', 'c', 't']);
  // });

  // it('will set object properties on a Custom Element that has not already been defined and upgraded', function() {
  //   let root = render(<ComponentWithUnregistered />, scratch);
  //   let wc = root.querySelector('#wc');
  //   expect(wc.obj).toEqual({ org: 'developit', repo: 'preact' });
  // });
});

describe('events', function() {
  it('can declaratively listen to a lowercase DOM event dispatched by a Custom Element', function() {
    let root = render(<ComponentWithEvent />, scratch);
    let component = root._component;
    let wc = root.querySelector('#wc');
    expect(wc).toExist();
    let handled = root.querySelector('#lowercase');
    expect(handled.textContent).toEqual('false');
    wc.click();
    component.forceUpdate();
    expect(handled.textContent).toEqual('true');
  });

  it('can declaratively listen to a kebab-case DOM event dispatched by a Custom Element', function() {
    let root = render(<ComponentWithEvent />, scratch);
    let component = root._component;
    let wc = root.querySelector('#wc');
    let handled = root.querySelector('#kebab');
    expect(handled.textContent).toEqual('false');
    wc.click();
    component.forceUpdate();
    expect(handled.textContent).toEqual('true');
  });

  it('can declaratively listen to a camelCase DOM event dispatched by a Custom Element', function() {
    let root = render(<ComponentWithEvent />, scratch);
    let component = root._component;
    let wc = root.querySelector('#wc');
    let handled = root.querySelector('#camel');
    expect(handled.textContent).toEqual('false');
    wc.click();
    component.forceUpdate();
    expect(handled.textContent).toEqual('true');
  });

  it('can declaratively listen to a CAPScase DOM event dispatched by a Custom Element', function() {
    let root = render(<ComponentWithEvent />, scratch);
    let component = root._component;
    let wc = root.querySelector('#wc');
    let handled = root.querySelector('#caps');
    expect(handled.textContent).toEqual('false');
    wc.click();
    component.forceUpdate();
    expect(handled.textContent).toEqual('true');
  });

  it('can declaratively listen to a PascalCase DOM event dispatched by a Custom Element', function() {
    let root = render(<ComponentWithEvent />, scratch);
    let component = root._component;
    let wc = root.querySelector('#wc');
    let handled = root.querySelector('#pascal');
    expect(handled.textContent).toEqual('false');
    wc.click();
    component.forceUpdate();
    expect(handled.textContent).toEqual('true');
  });
});
