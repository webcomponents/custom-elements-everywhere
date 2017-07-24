import React, { Component } from 'react';
import { render } from 'react-dom';
import 'ce-without-children';
import 'ce-with-children';
import 'ce-with-properties';
import 'ce-with-event';

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
    this.interval = setInterval(() =>
      this.setState({count: this.state.count += 1}), 1000);
  }
  componentWillUnmount () {
    clearInterval(this.interval);
  }
  render () {
    const { count } = this.state;
    return (
      <div>
        <ce-with-children ref="wc">{count}</ce-with-children>
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

export class ComponentWithProperties extends Component {
  render () {
    const data = {
      bool: true,
      num: 42,
      str: 'React',
      arr: ['R', 'e', 'a', 'c', 't'],
      obj: { org: 'facebook', repo: 'react' }
    };
    return (
      <div>
        <ce-with-properties ref="wc"
          bool={data.bool}
          num={data.num}
          str={data.str}
          arr={data.arr}
          obj={data.obj}
        ></ce-with-properties>
      </div>
    );
  }
}

export class ComponentWithUnregistered extends Component {
  render () {
    const data = {
      bool: true,
      num: 42,
      str: 'React',
      arr: ['R', 'e', 'a', 'c', 't'],
      obj: { org: 'facebook', repo: 'react' }
    };
    return (
      <div>
        {/* This element doesn't actually exist.
        It's used to test unupgraded behavior. */}
        <ce-unregistered ref="wc"
          bool={data.bool}
          num={data.num}
          str={data.str}
          arr={data.arr}
          obj={data.obj}
        ></ce-unregistered>
      </div>
    );
  }
}

export class ComponentWithEvent extends Component {
  constructor() {
    super();
    this.state = { wasClicked: false };
    this.handleTestEvent = this.handleTestEvent.bind(this);
  }
  handleTestEvent(e) {
    this.setState({ wasClicked: !this.state.wasClicked });
  }
  render() {
    return (
      <div>
        <div ref="toggle">{this.state.wasClicked.toString()}</div>
        <ce-with-event ref="wc" ontest-event={this.handleTestEvent}></ce-with-event>
      </div>
    );
  }
}
