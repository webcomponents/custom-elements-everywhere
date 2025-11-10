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

import 'wc/ce-without-children';
import 'wc/ce-with-children';
import 'wc/ce-with-properties';
import 'wc/ce-with-event';

import {html, define} from 'hybrids';

define({
  tag: 'hybrids-without-children',
  render: () => html`
      <ce-without-children id="ce-without-children"></ce-without-children>
  `,
});

define({
  tag: 'hybrids-with-children',
  render: () => html`
      <ce-with-children id="ce-with-children"></ce-with-children>
  `,
});

define({
  tag: 'hybrids-with-children-rerender',
  count: 1,
  render: {
    value: (host) => html`
        <ce-with-children id="ce-with-children-rerender">${host.count}</ce-with-children>
    `,
    connect(host, key, invalidate) {
      host.count += 1;
    }
  }
})

define({
  tag: 'hybrids-with-different-views',
  showWc: true,
  render: ({showWc}) => html`
      <div id="ce-with-different-views">
          <button onclick="${host => {
              host.showWc = !host.showWc
          }}">Toggle views
          </button>
          ${showWc ? html`
              <ce-with-children></ce-with-children>` : html`
              <div id="dummy">Dummy view</div>`}
      </div>
  `
});

define({
  tag: 'hybrids-with-properties',
  render: () => html`
      <ce-with-properties
              id="ce-with-properties"
              bool=${true}
              num=${42}
              str=${"custom"}
              arr=${['c', 'u', 's', 't', 'o', 'm']}
              obj=${{org: 'webcomponents', repo: 'custom-elements-everywhere'}}
              camelCaseObj=${{label: "passed"}}
      ></ce-with-properties>
  `,
});


define({
  tag: 'hybrids-with-imperative-event',
  eventHandled: false,
  render: {
    value: (host) => html`
        <div>
            <div id="ce-with-imperative-event-handled">${host.eventHandled.toString()}</div>
            <ce-with-event id="ce-with-imperative-event">Imperative</ce-with-event>
        </div>
    `,
    observe(host) {
      host.querySelector('ce-with-event').addEventListener('camelEvent', () => host.eventHandled = true);
    }
  }
});


define({
  tag: 'hybrids-with-declarative-event',
  lowercaseHandled: false,
  kebabHandled: false,
  camelHandled: false,
  capsHandled: false,
  pascalHandled: false,
  render: (host) => html`
      <div>
          <div>lowercase: ${host.lowercaseHandled.toString()}</div>
          <div>kebab-case: ${host.kebabHandled.toString()}</div>
          <div>camelCase: ${host.camelHandled.toString()}</div>
          <div>CAPScase: ${host.capsHandled.toString()}</div>
          <div>PascalCase: ${host.pascalHandled.toString()}</div>
          <ce-with-event
                  id="ce-with-declarative-event"
                  onlowercaseevent="${host => {
                      host.lowercaseHandled = true;
                  }}"
                  onkebab-event="${host => {
                      host.kebabHandled = true;
                  }}"
                  oncamelEvent="${host => {
                      host.camelHandled = true;
                  }}"
                  onCAPSevent="${host => {
                      host.capsHandled = true;
                  }}"
                  onPascalEvent="${host => {
                      host.pascalHandled = true;
                  }}"
          >Declarative
          </ce-with-event>
      </div>
  `
});
