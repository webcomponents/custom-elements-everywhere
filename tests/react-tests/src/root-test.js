import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import expect from 'expect';
import { Root } from './root';

describe('root', function() {
  it('renders without problems', function() {
    let root = ReactTestUtils.renderIntoDocument(<Root />);
    expect(root).toExist();
    let wc = ReactDOM.findDOMNode(root.refs.wc);
    expect(wc).toExist();
    let heading = wc.querySelector('h1');
    expect(heading).toExist();
    expect(heading.textContent).toEqual('Hello from x-foo');
  });
});
