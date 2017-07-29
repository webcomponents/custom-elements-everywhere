import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
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
    let root = ReactDOM.render(<ComponentWithoutChildren />, scratch);
    let wc = ReactDOM.findDOMNode(root.refs.wc);
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
    let root = ReactDOM.render(<ComponentWithChildren />, scratch);
    let wc = ReactDOM.findDOMNode(root.refs.wc);
    expectHasChildren(wc);
  });

  it('can display a Custom Element with children in a Shadow Root and pass in Light DOM children', async function() {
    let root = ReactDOM.render(<ComponentWithChildrenRerender />, scratch);
    let wc = ReactDOM.findDOMNode(root.refs.wc);
    await Promise.resolve();
    expectHasChildren(wc);
    expect(wc.textContent.includes('2')).toEqual(true);
  });

  it('can display a Custom Element with children in the Shadow DOM and handle hiding and showing the element', function() {
    let root = ReactDOM.render(<ComponentWithDifferentViews />, scratch);
    let wc = ReactDOM.findDOMNode(root.refs.wc);
    expectHasChildren(wc);
    root.toggle();
    let dummy = ReactDOM.findDOMNode(root.refs.dummy);
    expect(dummy).toExist();
    expect(dummy.textContent).toEqual('Dummy view');
    root.toggle();
    wc = ReactDOM.findDOMNode(root.refs.wc);
    expectHasChildren(wc);
  });
});

describe('attributes and properties', function() {
  it('will pass boolean data as either an attribute or a property', function() {
    let root = ReactDOM.render(<ComponentWithProperties />, scratch);
    let wc = ReactDOM.findDOMNode(root.refs.wc);
    let data = wc.bool || wc.hasAttribute('bool');
    expect(data).toBe(true);
  });

  it('will pass numeric data as either an attribute or a property', function() {
    let root = ReactDOM.render(<ComponentWithProperties />, scratch);
    let wc = ReactDOM.findDOMNode(root.refs.wc);
    let data = wc.num || wc.getAttribute('num');
    expect(data).toEqual(42);
  });

  it('will pass string data as either an attribute or a property', function() {
    let root = ReactDOM.render(<ComponentWithProperties />, scratch);
    let wc = ReactDOM.findDOMNode(root.refs.wc);
    let data = wc.str || wc.getAttribute('str');
    expect(data).toEqual('React');
  });

  it('will pass array data as a property', function() {
    let root = ReactDOM.render(<ComponentWithProperties />, scratch);
    let wc = ReactDOM.findDOMNode(root.refs.wc);
    let data = wc.arr;
    expect(data).toEqual(['R', 'e', 'a', 'c', 't']);
  });

  it('will pass object data as a property', function() {
    let root = ReactDOM.render(<ComponentWithProperties />, scratch);
    let wc = ReactDOM.findDOMNode(root.refs.wc);
    let data = wc.obj;
    expect(data).toEqual({ org: 'facebook', repo: 'react' });
  });

  // TODO: Is it the framework's responsibility to check if the underlying
  // property is defined? Or should it just always assume it is and do its
  // usual default behavior? Preact will actually check if it's defined and
  // use an attribute if it is not, otherwise it prefers properties for
  // everything. Is there a "right" answer in this situation?
  
  // it('will set boolean attributes on a Custom Element that has not already been defined and upgraded', function() {
  //   let root = ReactDOM.render(<ComponentWithUnregistered />, scratch);
  //   let wc = ReactDOM.findDOMNode(root.refs.wc);
  //   expect(wc.hasAttribute('bool')).toBe(true);
  // });

  // it('will set numeric attributes on a Custom Element that has not already been defined and upgraded', function() {
  //   let root = ReactDOM.render(<ComponentWithUnregistered />, scratch);
  //   let wc = ReactDOM.findDOMNode(root.refs.wc);
  //   expect(wc.getAttribute('num')).toEqual('42');
  // });

  // it('will set string attributes on a Custom Element that has not already been defined and upgraded', function() {
  //   let root = ReactDOM.render(<ComponentWithUnregistered />, scratch);
  //   let wc = ReactDOM.findDOMNode(root.refs.wc);
  //   expect(wc.getAttribute('str')).toEqual('React');
  // });

  // it('will set array attributes on a Custom Element that has not already been defined and upgraded', function() {
  //   let root = ReactDOM.render(<ComponentWithUnregistered />, scratch);
  //   let wc = ReactDOM.findDOMNode(root.refs.wc);
  //   expect(wc.getAttribute('arr')).toEqual(JSON.stringify(['R', 'e', 'a', 'c', 't']));
  // });

  // it('will set object attributes on a Custom Element that has not already been defined and upgraded', function() {
  //   let root = ReactDOM.render(<ComponentWithUnregistered />, scratch);
  //   let wc = ReactDOM.findDOMNode(root.refs.wc);
  //   expect(wc.getAttribute('obj')).toEqual(JSON.stringify({ org: 'facebook', repo: 'react' }));
  // });
});

describe('events', function() {
  it('can listen to a lowercase DOM event dispatched by a Custom Element', function() {
    let root = ReactDOM.render(<ComponentWithEvent />, scratch);
    let wc = ReactDOM.findDOMNode(root.refs.wc);
    let handled = ReactDOM.findDOMNode(root.refs.lowercase);
    expect(handled.textContent).toEqual('false');
    wc.click();
    root.forceUpdate();
    expect(handled.textContent).toEqual('true');
  });

  it('can listen to a kebab-case DOM event dispatched by a Custom Element', function() {
    let root = ReactDOM.render(<ComponentWithEvent />, scratch);
    let wc = ReactDOM.findDOMNode(root.refs.wc);
    let handled = ReactDOM.findDOMNode(root.refs.kebab);
    expect(handled.textContent).toEqual('false');
    wc.click();
    root.forceUpdate();
    expect(handled.textContent).toEqual('true');
  });

  it('can listen to a camelCase DOM event dispatched by a Custom Element', function() {
    let root = ReactDOM.render(<ComponentWithEvent />, scratch);
    let wc = ReactDOM.findDOMNode(root.refs.wc);
    let handled = ReactDOM.findDOMNode(root.refs.camel);
    expect(handled.textContent).toEqual('false');
    wc.click();
    root.forceUpdate();
    expect(handled.textContent).toEqual('true');
  });

  it('can listen to a CAPScase DOM event dispatched by a Custom Element', function() {
    let root = ReactDOM.render(<ComponentWithEvent />, scratch);
    let wc = ReactDOM.findDOMNode(root.refs.wc);
    let handled = ReactDOM.findDOMNode(root.refs.caps);
    expect(handled.textContent).toEqual('false');
    wc.click();
    root.forceUpdate();
    expect(handled.textContent).toEqual('true');
  });

  it('can listen to a PascalCase DOM event dispatched by a Custom Element', function() {
    let root = ReactDOM.render(<ComponentWithEvent />, scratch);
    let wc = ReactDOM.findDOMNode(root.refs.wc);
    let handled = ReactDOM.findDOMNode(root.refs.pascal);
    expect(handled.textContent).toEqual('false');
    wc.click();
    root.forceUpdate();
    expect(handled.textContent).toEqual('true');
  });
});
