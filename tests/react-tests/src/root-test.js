import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import expect from 'expect';
import { Root } from './root';

// Setup the test harness. This will get cleaned out with every test.
let app = document.createElement('div');
app.id = 'app';
document.body.appendChild(app);
let scratch; // This will hold the actual element under test.

describe('root', function() {

  beforeEach(function() {
    scratch = document.createElement('div');
    scratch.id = 'scratch';
    app.appendChild(scratch);
  });

  afterEach(function() {
    app.innerHTML = '';
    scratch = null;
  });

  it('renders without problems', function() {
    let root = ReactDOM.render(<Root />, scratch);
    expect(root).toExist();
  });

  it('can display a Custom Element with children created during connectedCallback', function() {
    let root = ReactDOM.render(<Root />, scratch);
    let wc = ReactDOM.findDOMNode(root.refs.wc);
    expect(wc).toExist();
    let heading = wc.querySelector('h1');
    expect(heading).toExist();
    expect(heading.textContent).toEqual('Hello from x-foo');
  });

});
