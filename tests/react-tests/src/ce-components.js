import React, { Component } from 'react';
import { render } from 'react-dom';
import 'ce-without-children';
import 'ce-with-children';

export class ComponentWithoutChildren extends Component {
  render() {
    return (
      <div>
        <ce-without-children ref="wc"></ce-without-children>
      </div>
    );
  }
}

export class ComponentWithChildren extends Component {
  render() {
    return (
      <div>
        <ce-with-children ref="wc"></ce-with-children>
      </div>
    );
  }
}

export class ComponentWithChildrenRerender extends Component {
  constructor () {
    super();
    this.state = { count: 1 };
  }
  componentDidMount () {
    this.interval = setTimeout(() =>
      this.setState({count: this.state.count += 1}), 1000);
  }
  componentWillUnmount () {
    clearInterval(this.interval);
  }
  render () {
    const { count } = this.state;
    return (
      <div>
        <ce-with-children>{count}</ce-with-children>
      </div>
    );
  }
}

export class ComponentWithDifferentViews extends Component {
  constructor () {
    super();
    this.state = { showWC: true };
  }
  toggle() {
    this.setState({ showWC: !this.state.showWC });
  }
  render () {
    const { showWC } = this.state;
    return (
      <div>
        {showWC ? (
          <ce-with-children ref="wc"></ce-with-children>
        ) : (
          <div ref="dummy">Dummy view</div>
        )}
      </div>
    );
  }
}
