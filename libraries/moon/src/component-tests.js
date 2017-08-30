/**
 * @license
 * Copyright 2017 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import Moon from 'moonjs';
import {
  ComponentWithoutChildren,
  ComponentWithChildren,
  ComponentWithChildrenRerender,
  ComponentWithDifferentViews,
  ComponentWithProperties,
  ComponentWithUnregistered,
  ComponentWithImperativeEvent,
  ComponentWithDeclarativeEvent
} from './components';
import expect from 'expect';

// Setup the test harness. This will get cleaned out with every test.
let app = document.createElement('div');
app.id = 'app';
document.body.appendChild(app);
let scratch; // This will hold the actual element under test.

beforeEach(function() {
  scratch = document.createElement('div');
  scratch.id = 'scratch';
  app.appendChild(scratch);
});

afterEach(function() {
  app.innerHTML = '';
  scratch = null;
});

// Perform tests after DOM is updated
const wait = (cb) => {
  return new Promise((resolve, reject) => {
    Moon.nextTick(() => {
      try {
        if(cb.toString().indexOf("done") !== -1) {
          cb(resolve);
        } else {
          cb();
          resolve();
        }
      } catch(err) {
        reject(err);
      }
    });
  });
}

describe('no children', function() {
  it('can display a Custom Element with no children', function() {
    let app = new ComponentWithoutChildren();
    app.mount(scratch);
    let root = app.root;
    let wc = root.querySelector('#wc');
    expect(wc).toExist();
  });
});

describe('with children', function() {
  function expectHasChildren(wc) {
    expect(wc).toExist();
    let shadowRoot = wc.shadowRoot;
    let heading = shadowRoot.querySelector('h1');
    expect(heading).toExist();
    expect(heading.textContent).toEqual('Test h1');
    let paragraph = shadowRoot.querySelector('p');
    expect(paragraph).toExist();
    expect(paragraph.textContent).toEqual('Test p');
  }

  it('can display a Custom Element with children in a Shadow Root', function() {
    let app = new ComponentWithChildren();
    app.mount(scratch);
    let root = app.root;
    let wc = root.querySelector('#wc');
    expectHasChildren(wc);
  });

  it('can display a Custom Element with children in a Shadow Root and pass in Light DOM children', function() {
    let app = new ComponentWithChildrenRerender();
    app.mount(scratch);
    let root = app.root;
    let wc = root.querySelector('#wc');

    return wait(() => {
      expectHasChildren(wc);
      expect(wc.textContent.includes('2')).toEqual(true);
    });
  });

  it('can display a Custom Element with children in the Shadow DOM and handle hiding and showing the element', function() {
    let app = new ComponentWithDifferentViews();
    app.mount(scratch);
    let root = app.root;
    let wc = root.querySelector('#wc');
    expectHasChildren(wc);
    app.callMethod("toggle");

    return wait((done) => {
      let dummy = root.querySelector('#dummy');
      expect(dummy).toExist();
      expect(dummy.textContent).toEqual('Dummy view');
      app.callMethod("toggle");

      Moon.nextTick(() => {
        wc = root.querySelector('#wc');
        expectHasChildren(wc);
        done();
      });
    });
  });
});

describe('attributes and properties', function() {
  it('will pass boolean data as either an attribute or a property', function() {
    let app = new ComponentWithProperties();
    app.mount(scratch);
    let root = app.root;
    let wc = root.querySelector('#wc');
    let data = wc.bool || wc.hasAttribute('bool');
    expect(data).toBe(true);
  });

  it('will pass numeric data as either an attribute or a property', function() {
    let app = new ComponentWithProperties();
    app.mount(scratch);
    let root = app.root;
    let wc = root.querySelector('#wc');
    let data = wc.num || wc.getAttribute('num');
    expect(data).toEqual(42);
  });

  it('will pass string data as either an attribute or a property', function() {
    let app = new ComponentWithProperties();
    app.mount(scratch);
    let root = app.root;
    let wc = root.querySelector('#wc');
    let data = wc.str || wc.getAttribute('str');
    expect(data).toEqual('Moon');
  });

  it('will pass array data as a property', function() {
    let app = new ComponentWithProperties();
    app.mount(scratch);
    let root = app.root;
    let wc = root.querySelector('#wc');
    let data = wc.arr;
    expect(data).toEqual(['M', 'o', 'o', 'n']);
  });

  it('will pass object data as a property', function() {
    let app = new ComponentWithProperties();
    app.mount(scratch);
    let root = app.root;
    let wc = root.querySelector('#wc');
    let data = wc.obj;
    expect(data).toEqual({ org: 'kbrsh', repo: 'moon' });
  });

  // it('will set boolean attributes on a Custom Element that has not already been defined and upgraded', function() {
  //   let app = new ComponentWithUnregistered();
  //   app.mount(scratch);
  //   let root = app.root;
  //   let wc = root.querySelector('#wc');
  //   expect(wc.hasAttribute('bool')).toBe(true);
  // });

  // it('will set numeric attributes on a Custom Element that has not already been defined and upgraded', function() {
  //   let app = new ComponentWithUnregistered();
  //   app.mount(scratch);
  //   let root = app.root;
  //   let wc = root.querySelector('#wc');
  //   expect(wc.getAttribute('num')).toEqual('42');
  // });

  // it('will set string attributes on a Custom Element that has not already been defined and upgraded', function() {
  //   let app = new ComponentWithUnregistered();
  //   app.mount(scratch);
  //   let root = app.root;
  //   let wc = root.querySelector('#wc');
  //   expect(wc.getAttribute('str')).toEqual('Moon');
  // });

  // it('will set array properties on a Custom Element that has not already been defined and upgraded', function() {
  //   let app = new ComponentWithUnregistered();
  //   app.mount(scratch);
  //   let root = app.root;
  //   let wc = root.querySelector('#wc');
  //   expect(wc.arr).toEqual(['M', 'o', 'o', 'n']);
  // });

  // it('will set object properties on a Custom Element that has not already been defined and upgraded', function() {
  //   let app = new ComponentWithUnregistered();
  //   app.mount(scratch);
  //   let root = app.root;
  //   let wc = root.querySelector('#wc');
  //   expect(wc.obj).toEqual({ org: 'kbrsh', repo: 'moon' });
  // });
});

describe('events', function() {
  it('can imperatively listen to a DOM event dispatched by a Custom Element', function() {
    let app = new ComponentWithImperativeEvent();
    app.mount(scratch);
    let root = app.root;
    let wc = root.querySelector('#wc');
    let handled = root.querySelector('#handled');
    expect(handled.textContent).toEqual('false');
    wc.click();

    return wait(() => {
      expect(handled.textContent).toEqual('true');
    });
  });

  it('can declaratively listen to a lowercase DOM event dispatched by a Custom Element', function() {
    let app = new ComponentWithDeclarativeEvent();
    app.mount(scratch);
    let root = app.root;
    let wc = root.querySelector('#wc');
    let handled = root.querySelector('#lowercase');
    expect(handled.textContent).toEqual('false');
    wc.click();

    return wait(() => {
      expect(handled.textContent).toEqual('true');
    });
  });

  it('can declaratively listen to a kebab-case DOM event dispatched by a Custom Element', function() {
    let app = new ComponentWithDeclarativeEvent();
    app.mount(scratch);
    let root = app.root;
    let wc = root.querySelector('#wc');
    let handled = root.querySelector('#kebab');
    expect(handled.textContent).toEqual('false');
    wc.click();

    return wait(() => {
      expect(handled.textContent).toEqual('true');
    });
  });

  it('can declaratively listen to a camelCase DOM event dispatched by a Custom Element', function() {
    let app = new ComponentWithDeclarativeEvent();
    app.mount(scratch);
    let root = app.root;
    let wc = root.querySelector('#wc');
    let handled = root.querySelector('#camel');
    expect(handled.textContent).toEqual('false');
    wc.click();

    return wait(() => {
      expect(handled.textContent).toEqual('true');
    });
  });

  it('can declaratively listen to a CAPScase DOM event dispatched by a Custom Element', function() {
    let app = new ComponentWithDeclarativeEvent();
    app.mount(scratch);
    let root = app.root;
    let wc = root.querySelector('#wc');
    let handled = root.querySelector('#caps');
    expect(handled.textContent).toEqual('false');
    wc.click();

    return wait(() => {
      expect(handled.textContent).toEqual('true');
    });
  });

  it('can declaratively listen to a PascalCase DOM event dispatched by a Custom Element', function() {
    let app = new ComponentWithDeclarativeEvent();
    app.mount(scratch);
    let root = app.root;
    let wc = root.querySelector('#wc');
    let handled = root.querySelector('#pascal');
    expect(handled.textContent).toEqual('false');
    wc.click();

    return wait(() => {
      expect(handled.textContent).toEqual('true');
    });
  });
});
