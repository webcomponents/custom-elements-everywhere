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

import Vue from 'vue';
import 'ce-without-children';
import 'ce-with-children';
import 'ce-with-properties';
import 'ce-with-event';

export const ComponentWithoutChildren = Vue.extend({
  template: `
    <div>
      <ce-without-children id="wc"></ce-without-children>
    </div>
  `
});

export const ComponentWithChildren = Vue.extend({
  template: `
    <div>
      <ce-with-children id="wc"></ce-with-children>
    </div>
  `
});

export const ComponentWithChildrenRerender = Vue.extend({
  template: `
    <div>
      <ce-with-children id="wc">{{count}}</ce-with-children>
    </div>
  `,
  data: function() {
    return {
      count: 1
    }
  },
  mounted: function() {
    Vue.nextTick(function() {
      this.count += 1;
    }.bind(this));
  }
});

export const ComponentWithDifferentViews = Vue.extend({
  template: `
    <div>
      <ce-with-children id="wc" v-if="showWC"></ce-with-children>
      <div id="dummy" v-else>Dummy view</div>
    </div>
  `,
  data: function() {
    return {
      showWC: true
    }
  },
  methods: {
    toggle: function() {
      this.showWC = !this.showWC;
    }
  }
});

export const ComponentWithProperties = Vue.extend({
  template: `
    <div>
      <ce-with-properties id="wc"
        :bool.prop="bool"
        :num.prop="num"
        :str.prop="str"
        :arr.prop="arr"
        :obj.prop="obj"
      ></ce-with-properties>
    </div>
  `,
  data: function() {
    return {
      bool: true,
      num: 42,
      str: 'Vue',
      arr: ['V', 'u', 'e'],
      obj: { org: 'vuejs', repo: 'vue' }
    }
  }
});

export const ComponentWithUnregistered = Vue.extend({
  template: `
    <div>
      <!-- This element doesn't actually exist.
      It's used to test unupgraded behavior. -->
      <ce-unregistered id="wc"
        :bool="bool"
        :num="num"
        :str="str"
        :arr.prop="arr"
        :obj.prop="obj"
      ></ce-unregistered>
    </div>
  `,
  data: function() {
    return {
      bool: true,
      num: 42,
      str: 'Vue',
      arr: ['V', 'u', 'e'],
      obj: { org: 'vuejs', repo: 'vue' }
    }
  }
});

export const ComponentWithImperativeEvent = Vue.extend({
  template: `
    <div>
      <div id="handled">{{eventHandled}}</div>
      <ce-with-event ref="customElement" id="wc"></ce-with-event>
    </div>
  `,
  data: function() {
    return {
      eventHandled: false
    }
  },
  methods: {
    handleTestEvent: function() {
      this.eventHandled = true;
    }
  },
  mounted: function() {
    this.$refs.customElement
      .addEventListener('camelEvent', this.handleTestEvent);
  }
});

export const ComponentWithDeclarativeEvent = Vue.extend({
  template: `
    <div>
      <div id="lowercase">{{lowercaseHandled}}</div>
      <div id="kebab">{{kebabHandled}}</div>
      <div id="camel">{{camelHandled}}</div>
      <div id="caps">{{capsHandled}}</div>
      <div id="pascal">{{pascalHandled}}</div>
      <ce-with-event id="wc"
        v-on:lowercaseevent="handleLowercaseEvent"
        v-on:kebab-event="handleKebabEvent"
        v-on:camelEvent="handleCamelEvent"
        v-on:CAPSevent="handleCapsEvent"
        v-on:PascalEvent="handlePascalEvent"
      ></ce-with-event>
    </div>
  `,
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
  }
});
