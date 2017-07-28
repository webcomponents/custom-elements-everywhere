import { h, render, Component } from 'preact';
import 'ce-without-children';
import 'ce-with-children';
import 'ce-with-properties';
import 'ce-with-event';

export class ComponentWithoutChildren extends Component {
  render() {
    return (
      <div>
        <ce-without-children id="wc"></ce-without-children>
      </div>
    );
  }
}

export class ComponentWithChildren extends Component {
  render() {
    return (
      <div>
        <ce-with-children id="wc"></ce-with-children>
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
    Promise.resolve().then(_ => this.setState({count: this.state.count += 1}));
  }
  componentWillUnmount () {
    clearInterval(this.interval);
  }
  render () {
    const { count } = this.state;
    return (
      <div>
        <ce-with-children id="wc">{count}</ce-with-children>
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
          <ce-with-children id="wc"></ce-with-children>
        ) : (
          <div id="dummy">Dummy view</div>
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
      str: 'Preact',
      arr: ['P', 'r', 'e', 'a', 'c', 't'],
      obj: { org: 'developit', repo: 'preact' }
    };
    return (
      <div>
        <ce-with-properties id="wc"
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
      str: 'Preact',
      arr: ['P', 'r', 'e', 'a', 'c', 't'],
      obj: { org: 'developit', repo: 'preact' }
    };
    return (
      <div>
        {/* This element doesn't actually exist.
        It's used to test unupgraded behavior. */}
        <ce-unregistered id="wc"
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
        <div id="toggle">{this.state.wasClicked.toString()}</div>
        <ce-with-event id="wc" ontest-event={this.handleTestEvent}></ce-with-event>
      </div>
    );
  }
}
