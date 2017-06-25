import React, { Component } from 'react';
import { render } from 'react-dom';
import 'xfoo';

export class Root extends Component {
  constructor () {
    super();
  }
  render () {
    return (
      <div>
        <x-foo ref="wc"></x-foo>
      </div>
    );
  }
}
