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

import {
  createComponentWithProperties,
  createComponentWithDeclarativeEvent,
} from './components';

import { expect } from 'chai';

// Setup the test harness. This will get cleaned out with every test.
const container = document.createElement('div');
document.body.appendChild(container);
let scratch; // This will hold the actual element under test.

beforeEach(function() {
  scratch = document.createElement('div');
  scratch.id = 'scratch';
  container.appendChild(scratch);
});

afterEach(function() {
  container.innerHTML = '';
  scratch = null;
});

describe('advanced support', function() {

  describe('attributes and properties', function() {
    it('will pass array data as a property', function() {
      this.weight = 2;
      const cmp = createComponentWithProperties();
      scratch.appendChild(cmp);

      const wc = cmp.shadowRoot.querySelector('ce-with-properties');
      const data = wc.arr;
      expect(data).to.eql(['L', 'W', 'C']);
    });

    it('will pass object data as a property', function() {
      this.weight = 2;
      const cmp = createComponentWithProperties();
      scratch.appendChild(cmp);

      const wc = cmp.shadowRoot.querySelector('ce-with-properties');
      const data = wc.obj;
      expect(data).to.eql({ org: 'salesforce', repo: 'lwc' });
    });

    it('will pass object data to a camelCase-named property', function() {
      this.weight = 2;
      const cmp = createComponentWithProperties();
      scratch.appendChild(cmp);

      const wc = cmp.shadowRoot.querySelector('ce-with-properties');
      const data = wc.camelCaseObj;
      expect(data).to.eql({ label: 'passed' });
    });
  });

  describe('events', function() {
    it('can declaratively listen to a lowercase DOM event dispatched by a Custom Element', async function() {
      this.weight = 2;
      const cmp = createComponentWithDeclarativeEvent();
      scratch.appendChild(cmp);

      const handled = cmp.shadowRoot.querySelector('#lowercase');
      expect(handled.textContent).to.eql('false');

      cmp.shadowRoot.querySelector('ce-with-event').click();
      await Promise.resolve();
      expect(handled.textContent).to.eql('true');
    });

    it('can declaratively listen to a kebab-case DOM event dispatched by a Custom Element', async function() {
      this.weight = 1;
      const cmp = createComponentWithDeclarativeEvent();
      scratch.appendChild(cmp);

      const handled = cmp.shadowRoot.querySelector('#kebab');
      expect(handled.textContent).to.eql('false');

      cmp.shadowRoot.querySelector('ce-with-event').click();
      await Promise.resolve();
      expect(handled.textContent).to.eql('true');
    });

    it('can declaratively listen to a camelCase DOM event dispatched by a Custom Element', async function() {
      this.weight = 1;
      const cmp = createComponentWithDeclarativeEvent();
      scratch.appendChild(cmp);

      const handled = cmp.shadowRoot.querySelector('#camel');
      expect(handled.textContent).to.eql('false');

      cmp.shadowRoot.querySelector('ce-with-event').click();
      await Promise.resolve();
      expect(handled.textContent).to.eql('true');
    });

    it('can declaratively listen to a CAPScase DOM event dispatched by a Custom Element', async function() {
      this.weight = 1;
      const cmp = createComponentWithDeclarativeEvent();
      scratch.appendChild(cmp);

      const handled = cmp.shadowRoot.querySelector('#caps');
      expect(handled.textContent).to.eql('false');

      cmp.shadowRoot.querySelector('ce-with-event').click();
      await Promise.resolve();
      expect(handled.textContent).to.eql('true');
    });

    it('can declaratively listen to a PascalCase DOM event dispatched by a Custom Element', async function() {
      this.weight = 1;
      const cmp = createComponentWithDeclarativeEvent();
      scratch.appendChild(cmp);

      const handled = cmp.shadowRoot.querySelector('#pascal');
      expect(handled.textContent).to.eql('false');

      cmp.shadowRoot.querySelector('ce-with-event').click();
      await Promise.resolve();
      expect(handled.textContent).to.eql('true');
    });
  });

});
