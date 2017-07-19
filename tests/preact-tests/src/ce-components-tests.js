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
} from './ce-components';

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
    let heading = wc.querySelector('h1');
    expect(heading).toExist();
    expect(heading.textContent).toEqual('Test h1');
    let paragraph = wc.querySelector('p');
    expect(paragraph).toExist();
    expect(paragraph.textContent).toEqual('Test p');
  }

  it('can display a Custom Element with children created during connectedCallback', function() {
    let root = render(<ComponentWithChildren />, scratch);
    let wc = root.querySelector('#wc');
    expectHasChildren(wc);
  });

  it('can display a Custom Element with children created during connectedCallback and render additional children inside of it', function() {
    let root = render(<ComponentWithChildrenRerender />, scratch);
    let wc = root.querySelector('#wc');
    expectHasChildren(wc);
  });

  it('can display a Custom Element with children created during connectedCallback and handle hiding and showing the element', function() {
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
  it('will set boolean properties on a Custom Element that has already been defined and upgraded', function() {
    let root = render(<ComponentWithProperties />, scratch);
    let wc = root.querySelector('#wc');
    expect(wc.bool).toBe(true);
  });

  it('will set numeric properties on a Custom Element that has already been defined and upgraded', function() {
    let root = render(<ComponentWithProperties />, scratch);
    let wc = root.querySelector('#wc');
    expect(wc.num).toEqual(42);
  });

  it('will set string properties on a Custom Element that has already been defined and upgraded', function() {
    let root = render(<ComponentWithProperties />, scratch);
    let wc = root.querySelector('#wc');
    expect(wc.str).toEqual('Preact');
  });

  it('will set array properties on a Custom Element that has already been defined and upgraded', function() {
    let root = render(<ComponentWithProperties />, scratch);
    let wc = root.querySelector('#wc');
    expect(wc.arr).toEqual(['P', 'r', 'e', 'a', 'c', 't']);
  });

  it('will set object properties on a Custom Element that has already been defined and upgraded', function() {
    let root = render(<ComponentWithProperties />, scratch);
    let wc = root.querySelector('#wc');
    expect(wc.obj).toEqual({ org: 'developit', repo: 'preact' });
  });

  it('will set boolean attributes on a Custom Element that has not already been defined and upgraded', function() {
    let root = render(<ComponentWithUnregistered />, scratch);
    let wc = root.querySelector('#wc');
    expect(wc.hasAttribute('bool')).toBe(true);
  });

  it('will set numeric attributes on a Custom Element that has not already been defined and upgraded', function() {
    let root = render(<ComponentWithUnregistered />, scratch);
    let wc = root.querySelector('#wc');
    expect(wc.getAttribute('num')).toEqual('42');
  });

  it('will set string attributes on a Custom Element that has not already been defined and upgraded', function() {
    let root = render(<ComponentWithUnregistered />, scratch);
    let wc = root.querySelector('#wc');
    expect(wc.getAttribute('str')).toEqual('Preact');
  });

  // Related:
  // https://github.com/developit/preact/issues/678
  // https://github.com/developit/preact/pull/511
  it('will set array properties on a Custom Element that has not already been defined and upgraded', function() {
    let root = render(<ComponentWithUnregistered />, scratch);
    let wc = root.querySelector('#wc');
    expect(wc.arr).toEqual(['P', 'r', 'e', 'a', 'c', 't']);
  });

  it('will set object properties on a Custom Element that has not already been defined and upgraded', function() {
    let root = render(<ComponentWithUnregistered />, scratch);
    let wc = root.querySelector('#wc');
    expect(wc.obj).toEqual({ org: 'developit', repo: 'preact' });
  });
});

describe('events', function() {
  it('can listen to events from a Custom Element', function() {
    let root = render(<ComponentWithEvent />, scratch);
    let wc = root.querySelector('#wc');
    let toggle = root.querySelector('#toggle');
    expect(toggle.textContent).toEqual('false');
    wc.click();
    expect(toggle.textContent).toEqual('true');
  });
});
