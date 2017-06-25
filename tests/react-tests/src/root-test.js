import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import expect from 'expect';
import { Root } from './root';

let app;
describe('root', function() {

  beforeEach(function() {
    app = document.createElement('div');
    document.body.appendChild(app);
  });

  afterEach(function() {
    app.innerHTML = '';
  });

  it('renders without problems', function() {
    let root = ReactDOM.render(<Root />, app);
    expect(root).toExist();
  });

  it('can display a Custom Element with children created during connectedCallback', function() {
    let root = ReactDOM.render(<Root />, app);
    let wc = ReactDOM.findDOMNode(root.refs.wc);
    expect(wc).toExist();
    let heading = wc.querySelector('h1');
    expect(heading).toExist();
    expect(heading.textContent).toEqual('Hello from x-foo');
  });

});
