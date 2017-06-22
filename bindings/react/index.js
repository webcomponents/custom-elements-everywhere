import './element';
import React, { Component } from 'react';
import { render } from 'react-dom';

class Page extends Component {
  constructor () {
    super();
  }
  render () {
    // Create some dummy data
    const data = {
      boolean: true,
      number: 42,
      string: 'React',
      array: ['R', 'e', 'a', 'c', 't'],
      object: { org: 'facebook', repo: 'react' },
      dummy: 'dummy' // this property doesn't exist on the element
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
