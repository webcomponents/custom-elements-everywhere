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
  ComponentWithUnregistered
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
      let heading = wc.querySelector('h1');
      expect(heading).toExist();
      expect(heading.textContent).toEqual('Test h1');
      let paragraph = wc.querySelector('p');
      expect(paragraph).toExist();
      expect(paragraph.textContent).toEqual('Test p');
    }

    it('can display a Custom Element with children created during connectedCallback', function() {
      let root = ReactDOM.render(<ComponentWithChildren />, scratch);
      let wc = ReactDOM.findDOMNode(root.refs.wc);
      expectHasChildren(wc);
    });

    it('can display a Custom Element with children created during connectedCallback and render additional children inside of it', function() {
      let root = ReactDOM.render(<ComponentWithChildrenRerender />, scratch);
      let wc = ReactDOM.findDOMNode(root.refs.wc);
      expectHasChildren(wc);
    });

    it('can display a Custom Element with children created during connectedCallback and handle hiding and showing the element', function() {
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

    it('will set boolean properties on a Custom Element that has already been defined and upgraded', function() {
      let root = ReactDOM.render(<ComponentWithProperties />, scratch);
      let wc = ReactDOM.findDOMNode(root.refs.wc);
      expect(wc.bool).toBe(true);
    });

    it('will set numeric properties on a Custom Element that has already been defined and upgraded', function() {
      let root = ReactDOM.render(<ComponentWithProperties />, scratch);
      let wc = ReactDOM.findDOMNode(root.refs.wc);
      expect(wc.num).toEqual(42);
    });

    it('will set string properties on a Custom Element that has already been defined and upgraded', function() {
      let root = ReactDOM.render(<ComponentWithProperties />, scratch);
      let wc = ReactDOM.findDOMNode(root.refs.wc);
      expect(wc.str).toEqual('React');
    });

    it('will set array properties on a Custom Element that has already been defined and upgraded', function() {
      let root = ReactDOM.render(<ComponentWithProperties />, scratch);
      let wc = ReactDOM.findDOMNode(root.refs.wc);
      expect(wc.arr).toEqual(['R', 'e', 'a', 'c', 't']);
    });

    it('will set object properties on a Custom Element that has already been defined and upgraded', function() {
      let root = ReactDOM.render(<ComponentWithProperties />, scratch);
      let wc = ReactDOM.findDOMNode(root.refs.wc);
      expect(wc.obj).toEqual({ org: 'facebook', repo: 'react' });
    });

    it('will set boolean attributes on a Custom Element that has not already been defined and upgraded', function() {
      let root = ReactDOM.render(<ComponentWithUnregistered />, scratch);
      let wc = ReactDOM.findDOMNode(root.refs.wc);
      expect(wc.hasAttribute('bool')).toBe(true);
    });

    it('will set numeric attributes on a Custom Element that has not already been defined and upgraded', function() {
      let root = ReactDOM.render(<ComponentWithUnregistered />, scratch);
      let wc = ReactDOM.findDOMNode(root.refs.wc);
      expect(wc.getAttribute('num')).toEqual('42');
    });

    it('will set string attributes on a Custom Element that has not already been defined and upgraded', function() {
      let root = ReactDOM.render(<ComponentWithUnregistered />, scratch);
      let wc = ReactDOM.findDOMNode(root.refs.wc);
      expect(wc.getAttribute('str')).toEqual('React');
    });

    it('will set array attributes on a Custom Element that has not already been defined and upgraded', function() {
      let root = ReactDOM.render(<ComponentWithUnregistered />, scratch);
      let wc = ReactDOM.findDOMNode(root.refs.wc);
      expect(wc.getAttribute('arr')).toEqual(JSON.stringify(['R', 'e', 'a', 'c', 't']));
    });

    it('will set object attributes on a Custom Element that has not already been defined and upgraded', function() {
      let root = ReactDOM.render(<ComponentWithUnregistered />, scratch);
      let wc = ReactDOM.findDOMNode(root.refs.wc);
      expect(wc.getAttribute('obj')).toEqual(JSON.stringify({ org: 'facebook', repo: 'react' }));
    });

  });

  // it('it can listen to events from a Custom Element', function() {

  // });

});
