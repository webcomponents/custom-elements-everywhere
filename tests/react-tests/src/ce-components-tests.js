import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import expect from 'expect';
import {
  ComponentWithoutChildren,
  ComponentWithChildren,
  ComponentWithChildrenRerender,
  ComponentWithDifferentViews
} from './ce-components';

// Setup the test harness. This will get cleaned out with every test.
let app = document.createElement('div');
app.id = 'app';
document.body.appendChild(app);
let scratch; // This will hold the actual element under test.

describe('React', function() {

  beforeEach(function() {
    scratch = document.createElement('div');
    scratch.id = 'scratch';
    app.appendChild(scratch);
  });

  afterEach(function() {
    app.innerHTML = '';
    scratch = null;
  });

  it('can display a Custom Element with no children', function() {
    let root = ReactDOM.render(<ComponentWithoutChildren />, scratch);
    let wc = ReactDOM.findDOMNode(root.refs.wc);
    expect(wc).toExist();
  });

  it('can display a Custom Element with children created during connectedCallback', function() {
    let root = ReactDOM.render(<ComponentWithChildren />, scratch);
    let wc = ReactDOM.findDOMNode(root.refs.wc);
    expect(wc).toExist();
    let heading = wc.querySelector('h1');
    expect(heading).toExist();
    expect(heading.textContent).toEqual('Test h1');
    let paragraph = wc.querySelector('p');
    expect(paragraph).toExist();
    expect(paragraph.textContent).toEqual('Test p');
  });

  it.skip('can display a Custom Element with children created during connectedCallback and render additional children inside of it', function() {
    let root = ReactDOM.render(<ComponentWithChildrenRerender />, scratch);
    let wc = ReactDOM.findDOMNode(root.refs.wc);
    expect(wc).toExist();
    let heading = wc.querySelector('h1');
    expect(heading).toExist();
    expect(heading.textContent).toEqual('Test h1');
    let paragraph = wc.querySelector('p');
    expect(paragraph).toExist();
    expect(paragraph.textContent).toEqual('Test p');
  });

  it('can display a Custom Element with children created during connectedCallback and handle hiding and showing the element', function() {
    let root = ReactDOM.render(<ComponentWithDifferentViews />, scratch);
    let wc = ReactDOM.findDOMNode(root.refs.wc);
    let heading = wc.querySelector('h1');
    expect(heading).toExist();
    expect(heading.textContent).toEqual('Test h1');
    let paragraph = wc.querySelector('p');
    expect(paragraph).toExist();
    expect(paragraph.textContent).toEqual('Test p');
    root.toggle();
    let dummy = ReactDOM.findDOMNode(root.refs.dummy);
    expect(dummy).toExist();
    expect(dummy.textContent).toEqual('Dummy view');
    root.toggle();
    wc = ReactDOM.findDOMNode(root.refs.wc);
    heading = wc.querySelector('h1');
    expect(heading).toExist();
    expect(heading.textContent).toEqual('Test h1');
    paragraph = wc.querySelector('p');
    expect(paragraph).toExist();
    expect(paragraph.textContent).toEqual('Test p');
  });

  // it('will set properties on a Custom Element that has already been defined and upgraded', function() {

  // });

  // it('will set attributes on a Custom Element that has not already been defined and upgraded', function() {

  // });

  // it('it can listen to events from a Custom Element', function() {

  // });

});
