/**
 * @license
 * Copyright 2017 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import Moon from 'moonjs';
import 'ce-without-children';
import 'ce-with-children';
import 'ce-with-properties';
import 'ce-with-event';

export const ComponentWithoutChildren = Moon.component('ComponentWithoutChildren', {
  template: `<div><ce-without-children id='wc'></ce-without-children></div>`
});

export const ComponentWithChildren = Moon.component('ComponentWithChildren', {
  template: `<div><ce-with-children id='wc'></ce-with-children></div>`
});

export const ComponentWithChildrenRerender = Moon.component('ComponentWithChildrenRerender', {
  template: `<div><ce-with-children id='wc'>{{count}}</ce-with-children></div>`,
  data: function() {
    return {
      count: 1
    }
  },
  hooks: {
    mounted: function() {
      this.set('count', this.get('count') + 1);
    }
  }
});

export const ComponentWithDifferentViews = Moon.component('ComponentWithDifferentViews', {
  template: `<div><ce-with-children id='wc' m-if='showWC'></ce-with-children><div id='dummy' m-if='!showWC'>Dummy view</div></div>`,
  data: function() {
    return {
      showWC: true
    }
  },
  methods: {
    toggle: function() {
      this.set('showWC', !this.get('showWC'));
    }
  }
});

export const ComponentWithProperties = Moon.component('ComponentWithProperties', {
  template: `<div><ce-with-properties id='wc' m-literal:bool='bool' m-literal:num='num' m-literal:str='str' m-literal:arr.dom='arr' m-literal:obj.dom='obj'></ce-with-properties></div>`,
  data: function() {
    return {
      bool: true,
      num: 42,
      str: 'Moon',
      arr: ['M', 'o', 'o', 'n'],
      obj: { org: 'kbrsh', repo: 'moon' }
    }
  }
});

export const ComponentWithUnregistered = Moon.component('ComponentWithUnregistered', {
  template: `<div><ce-unregistered id='wc' m-literal:bool='bool' m-literal:num='num' m-literal:str='str' m-literal:arr.dom='arr' m-literal:obj.dom='obj'></ce-unregistered></div>`,
  data: function() {
    return {
      bool: true,
      num: 42,
      str: 'Moon',
      arr: ['M', 'o', 'o', 'n'],
      obj: { org: 'kbrsh', repo: 'moon' }
    }
  }
});

export const ComponentWithImperativeEvent = Moon.component('ComponentWithImperativeEvent', {
  template: `<div><div id='handled'>{{eventHandled}}</div><ce-with-event id='wc'></ce-with-event></div>`,
  data: function() {
    return {
      eventHandled: false
    }
  },
  methods: {
    handleEvent: function() {
      this.set('eventHandled', true);
    }
  },
  hooks: {
    mounted: function() {
      this.el.firstChild.nextSibling.addEventListener('camelEvent', this.get('handleEvent'));
    }
  }
});

export const ComponentWithDeclarativeEvent = Moon.component('ComponentWithDeclarativeEvent', {
  template: `<div><div id='lowercase'>{{lowercaseHandled}}</div><div id='kebab'>{{kebabHandled}}</div><div id='camel'>{{camelHandled}}</div><div id='caps'>{{capsHandled}}</div><div id='pascal'>{{pascalHandled}}</div><ce-with-event id='wc' m-on:lowercaseevent='handleLowercaseEvent' m-on:kebab-event='handleKebabEvent' m-on:camelEvent='handleCamelEvent' m-on:CAPSevent='handleCapsEvent' m-on:PascalEvent='handlePascalEvent'></ce-with-event></div>`,
  data: function() {
    return {
      lowercaseHandled: false,
      kebabHandled: false,
      camelHandled: false,
      capsHandled: false,
      pascalHandled: false
    }
  },
  methods: {
    handleLowercaseEvent: function() {
      this.set('lowercaseHandled', true);
    },
    handleKebabEvent: function() {
      this.set('kebabHandled', true);
    },
    handleCamelEvent: function() {
      this.set('camelHandled', true);
    },
    handleCapsEvent: function() {
      this.set('capsHandled', true);
    },
    handlePascalEvent: function() {
      this.set('pascalHandled', true);
    }
  }
});
