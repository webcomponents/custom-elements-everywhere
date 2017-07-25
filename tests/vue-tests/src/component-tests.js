import Vue from 'vue';
import {
  ComponentWithoutChildren,
  ComponentWithChildren,
  ComponentWithChildrenRerender,
  ComponentWithDifferentViews,
  ComponentWithProperties,
  ComponentWithUnregistered,
  ComponentWithEvent
} from './components';
import expect from 'expect';

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
    let root = new ComponentWithoutChildren().$mount(scratch).$el;
    let wc = app.querySelector('#wc');
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
    let root = new ComponentWithChildren().$mount(scratch).$el;
    let wc = root.querySelector('#wc');
    expectHasChildren(wc);
  });

  it('can display a Custom Element with children in a Shadow Root and pass in Light DOM children', async function() {
    let vm = new ComponentWithChildrenRerender().$mount(scratch);
    let root = vm.$el;
    let wc = root.querySelector('#wc');
    await vm.$nextTick();
    expectHasChildren(wc);
    expect(wc.textContent.includes('2')).toEqual(true);
  });

  it('can display a Custom Element with children in the Shadow DOM and handle hiding and showing the element', async function() {
    let vm = new ComponentWithDifferentViews().$mount(scratch);
    let root = vm.$el;
    let wc = root.querySelector('#wc');
    expectHasChildren(wc);
    vm.toggle();
    await vm.$nextTick();
    let dummy = root.querySelector('#dummy');
    expect(dummy).toExist();
    expect(dummy.textContent).toEqual('Dummy view');
    vm.toggle();
    await vm.$nextTick();
    wc = root.querySelector('#wc');
    expectHasChildren(wc);
  });
});

describe('attributes and properties', function() {
  it('will pass boolean data as either an attribute or a property', function() {
    let root = new ComponentWithProperties().$mount(scratch).$el;
    let wc = root.querySelector('#wc');
    let data = wc.bool || wc.hasAttribute('bool');
    expect(data).toBe(true);
  });

  it('will pass numeric data as either an attribute or a property', function() {
    let root = new ComponentWithProperties().$mount(scratch).$el;
    let wc = root.querySelector('#wc');
    let data = wc.num || wc.getAttribute('num');
    expect(data).toEqual(42);
  });

  it('will pass string data as either an attribute or a property', function() {
    let root = new ComponentWithProperties().$mount(scratch).$el;
    let wc = root.querySelector('#wc');
    let data = wc.str || wc.getAttribute('str');
    expect(data).toEqual('Vue');
  });

  it('will pass array data as a property', function() {
    let root = new ComponentWithProperties().$mount(scratch).$el;
    let wc = root.querySelector('#wc');
    let data = wc.arr;
    expect(data).toEqual(['V', 'u', 'e']);
  });

  it('will pass object data as a property', function() {
    let root = new ComponentWithProperties().$mount(scratch).$el;
    let wc = root.querySelector('#wc');
    let data = wc.obj;
    expect(data).toEqual({ org: 'vuejs', repo: 'vue' });
  });

  // it('will set boolean attributes on a Custom Element that has not already been defined and upgraded', function() {
  //   let root = new ComponentWithUnregistered().$mount(scratch).$el;
  //   let wc = root.querySelector('#wc');
  //   expect(wc.hasAttribute('bool')).toBe(true);
  // });

  // it('will set numeric attributes on a Custom Element that has not already been defined and upgraded', function() {
  //   let root = new ComponentWithUnregistered().$mount(scratch).$el;
  //   let wc = root.querySelector('#wc');
  //   expect(wc.getAttribute('num')).toEqual('42');
  // });

  // it('will set string attributes on a Custom Element that has not already been defined and upgraded', function() {
  //   let root = new ComponentWithUnregistered().$mount(scratch).$el;
  //   let wc = root.querySelector('#wc');
  //   expect(wc.getAttribute('str')).toEqual('Vue');
  // });

  // it('will set array properties on a Custom Element that has not already been defined and upgraded', function() {
  //   let root = new ComponentWithUnregistered().$mount(scratch).$el;
  //   let wc = root.querySelector('#wc');
  //   expect(wc.arr).toEqual(['V', 'u', 'e']);
  // });

  // it('will set object properties on a Custom Element that has not already been defined and upgraded', function() {
  //   let root = new ComponentWithUnregistered().$mount(scratch).$el;
  //   let wc = root.querySelector('#wc');
  //   expect(wc.obj).toEqual({ org: 'vuejs', repo: 'vue' });
  // });
});

describe('events', function() {
  it('can listen to a DOM event dispatched by a Custom Element', async function() {
    let vm = new ComponentWithEvent().$mount(scratch);
    let root = vm.$el;
    let wc = root.querySelector('#wc');
    let toggle = root.querySelector('#toggle');
    expect(toggle.textContent).toEqual('false');
    wc.click();
    await vm.$nextTick();
    expect(toggle.textContent).toEqual('true');
  });
});
