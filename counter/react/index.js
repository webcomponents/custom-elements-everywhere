import './counters';
import React, { Component } from 'react';
import { render } from 'react-dom';

class Page extends Component {
  constructor () {
    super();
    this.state = { count: 1 };
  }
  componentDidMount () {
    this.interval = setInterval(() =>
      this.setState(this.increment), 1000);
  }
  componentWillUnmount () {
    clearInterval(this.interval);
  }
  increment ({ count }) {
    return { count: count + 1 };
  }
  render () {
    const { count } = this.state;
    return (
      <div>
        <x-count>{count}</x-count>
        <x-count-with-shadow>{count}</x-count-with-shadow>
      </div>
    );
  }
}

render(
  <Page />,
  document.getElementById('root')
);
