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

export const ComponentWithEvent = Vue.extend({
  template: `
    <div>
      <div id="toggle">{{wasClicked}}</div>
      <ce-with-event id="wc" v-on:test-event="handleTestEvent"></ce-with-event>
    </div>
  `,
  data: function() {
    return {
      wasClicked: false
    }
  },
  methods: {
    handleTestEvent: function(event) {
      this.wasClicked = !this.wasClicked;
    }
  }
});
