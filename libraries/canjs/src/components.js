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

import Component from 'can-component';
import DefineMap from 'can-define/map/map';
import stache from 'can-stache';
import 'ce-without-children';
import 'ce-with-children';
import 'ce-with-properties';
import 'ce-with-event';

export const ComponentWithoutChildren = 'without-children';
Component.extend({
  tag: ComponentWithoutChildren,
  view: stache(`
    <div>
      <ce-without-children id="wc"></ce-without-children>
    </div>
  `)
});

export const ComponentWithChildren = 'with-children';
Component.extend({
  tag: ComponentWithChildren,
  view: stache(`
    <div>
      <ce-with-children id="wc"></ce-with-children>
    </div>
  `)
});

export const ComponentWithChildrenRerender = 'with-children-rerender';
Component.extend({
  tag: ComponentWithChildrenRerender,
  view: stache(`
    <div>
      <ce-with-children id="wc">{{count}}</ce-with-children>
    </div>
  `),
  ViewModel: DefineMap.extend({
    count: {type: 'number', value: 1},
    toggle: function() {
      this.showWC = !this.showWC;
    }
  }),
  events: {
    inserted: function() {
      this.viewModel.count += 1;
    }
  }
});

export const ComponentWithDifferentViews = 'with-children-diff-views';
Component.extend({
  tag: ComponentWithDifferentViews,
  view: stache(`
    <div>
    showWC: {{showWC}}
      {{#if showWC}}
        <ce-with-children id="wc"></ce-with-children>
      {{else}}
        <div id="dummy">Dummy view</div>
      {{/if}}
    </div>
  `),
  ViewModel: DefineMap.extend({
    showWC: {type: 'boolean', value: true},
    toggle: function() {
      this.showWC = !this.showWC;
    }
  })
});

export const ComponentWithProperties = 'with-properties';
Component.extend({
  tag: ComponentWithProperties,
  view: stache(`
    <div>
      <ce-with-properties id="wc"
        bool="{{bool}}"
        num="{{num}}"
        str="{{str}}"
        arr="{{arr}}"
        obj="{{obj}}"
      ></ce-with-properties>
    </div>
  `),
  ViewModel: DefineMap.extend({
    bool: {type: 'boolean', value: true},
    num: {type: 'number', value: 42},
    str: {type: 'string', value: 'CanJS'},
    arr: {type: 'any', value: function() {
      return ['C', 'a', 'n', 'j', 's'];
    }},
    obj: {type: 'any', value: function() {
      return { org: 'canjs', repo: 'canjs' }
    }}
  })
});

export const ComponentWithUnregistered = 'with-unregistered';
Component.extend({
  tag: ComponentWithUnregistered,
  view: stache(`
    <div>
      <!-- This element doesn't actually exist.
      It's used to test unupgraded behavior. -->
      <ce-unregistered id="wc"
        bool="{{bool}}"
        num="{{num}}"
        str="{{str}}"
        arr="{{arr}}"
        obj="{{obj}}"
      ></ce-unregistered>
    </div>
  `),
  ViewModel: DefineMap.extend({
    bool: {type: 'boolean', value: true},
    num: {type: 'number', value: 42},
    str: {type: 'string', value: 'CanJS'},
    arr: {type: 'any', value: function() {
      return ['C', 'a', 'n', 'j', 's'];
    }},
    obj: {type: 'any', value: function() {
      return { org: 'canjs', repo: 'canjs' }
    }}
  })
});

export const ComponentWithImperativeEvent = 'with-imperative-event';
Component.extend({
  tag: ComponentWithImperativeEvent,
  view: stache(`
    <div>
      <div id="handled">{{eventHandled}}</div>
      <ce-with-event ref="customElement" id="wc"></ce-with-event>
    </div>
  `),
  ViewModel: DefineMap.extend({
    eventHandled: {type: 'boolean', value: false},
    handleTestEvent: function() {
      this.eventHandled = true;
    }
  }),
  events: {
    inserted: function() {
      let viewModel = this.viewModel;
      let wc = this.element.querySelector('#wc');
      this.handleTestEventListener = viewModel.handleTestEvent.bind(viewModel);
      wc.addEventListener('camelEvent', this.handleTestEventListener);
    },
    removed: function() {
      let wc = this.element.querySelector('#wc');
      wc.removeEventListener('camelEvent', this.handleTestEventListener);
    }
  }
});

export const ComponentWithDeclarativeEvent = 'with-declarative-event';
Component.extend({
  tag: ComponentWithDeclarativeEvent,
  view: stache(`
    <div>
      <div id="lowercase">{{lowercaseHandled}}</div>
      <div id="kebab">{{kebabHandled}}</div>
      <div id="camel">{{camelHandled}}</div>
      <div id="caps">{{capsHandled}}</div>
      <div id="pascal">{{pascalHandled}}</div>
      <ce-with-event id="wc"
        on:lowercaseevent="handleLowercaseEvent"
        on:kebab-event="handleKebabEvent"
        on:camelEvent="handleCamelEvent"
        on:CAPSevent="handleCapsEvent"
        on:PascalEvent="handlePascalEvent"
      ></ce-with-event>
    </div>
  `),
  ViewModel: DefineMap.extend({
    lowercaseHandled: {type: 'boolean', value: false},
    kebabHandled: {type: 'boolean', value: false},
    camelHandled: {type: 'boolean', value: false},
    capsHandled: {type: 'boolean', value: false},
    pascalHandled: {type: 'boolean', value: false},
    handleLowercaseEvent: function() {
      this.lowercaseHandled = true;
    },
    handleKebabEvent: function() {
      this.kebabHandled = true;
    },
    handleCamelEvent: function() {
      this.camelHandled = true;
    },
    handleCapsEvent: function() {
      this.capsHandled = true;
    },
    handlePascalEvent: function() {
      this.pascalHandled = true;
    }
  })
});
