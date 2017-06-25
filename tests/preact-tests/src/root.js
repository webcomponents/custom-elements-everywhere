import { h, render, Component } from 'preact';
import 'xfoo';

export class Root extends Component {
  render() {
    return (
      <div>
        <x-foo></x-foo>
      </div>
    );
  }
}
