import './element';
import { h, render, Component } from 'preact';

class Page extends Component {
  constructor () {
    super();
  }
  render () {
    // Create some dummy data
    const data = {
      boolean: true,
      number: 42,
      string: 'Preact',
      array: ['P', 'r', 'e', 'a', 'c', 't'],
      object: { org: 'developit', repo: 'preact' },
      undefinedBoolean: true,
      undefinedNumber: 42,
      undefinedString: 'Preact',
      undefinedArray: ['P', 'r', 'e', 'a', 'c', 't'],
      undefinedObject: { org: 'developit', repo: 'preact' },
    };
    // Observe how React binds different data types
    return (
      <div>
        <x-element
          boolean={data.boolean}
          number={data.number}
          string={data.string}
          array={data.array}
          object={data.object}
          undefined-boolean={data.undefinedBoolean}
          undefined-number={data.undefinedNumber}
          undefined-string={data.undefinedString}
          undefined-array={data.undefinedArray}
          undefined-object={data.undefinedObject}
        ></x-element>
      </div>
    );
  }
}

render(
  <Page />,
  document.getElementById('root')
);
