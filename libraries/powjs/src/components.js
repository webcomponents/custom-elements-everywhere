import 'ce-without-children';
import 'ce-with-children';
import 'ce-with-properties';
import 'ce-with-event';

import powjs from 'powjs';

class CEShadowLife extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    let callback = this.callback;
    this.parentElement.removeChild(this);
    if (typeof callback === 'function')
      callback();
  }
}

customElements.define('ce-sl', CEShadowLife);

function compile(tmpl, ctx) {
  return [powjs(tmpl).view, ctx];
}

export const ComponentWithoutChildren = compile(`
  <div>
    <ce-without-children id="wc"></ce-without-children>
  </div>`);

export const ComponentWithChildren = compile(`
  <div>
    <ce-with-children id="wc"></ce-with-children>
  </div>`);

export const ComponentWithChildrenRerender = compile(`
  <div>
    <ce-with-children id="wc">{{this.x.count}}
      <ce-sl style="display:none;" do="this.x.setSL(this)"></ce-sl>
    </ce-with-children>
  </div>`,
  ()=>({
    count: 1,
    setSL: (pow)=> {
      pow.node.callback = (function () {
        let self = this;
        self.x = ++self.x.count;

        setTimeout(function() {
          self.parent.textContent = self.x;
        }, 0);

      }).bind({ parent: pow.parent, x: pow.x });
    },
  })
);

export const ComponentWithDifferentViews = compile(`
  <div>
    showWC: {{this.x.showWC}}
    <ce-with-children if="this.x.showWC" id="wc" break></ce-with-children>
    <div id="dummy">Dummy view</div>
  </div>`,
  ()=>({
    showWC: true,
    toggle: function () {
      this.showWC = !this.showWC;
    },
  })
);

export const ComponentWithProperties = compile(`
  <div>
    <ce-with-properties id="wc" let="x=this.x"
      bool
      num
      str
      arr
      obj
    ></ce-with-properties>
  </div>`,
  ()=>({
    bool: (pow)=> {pow.node.bool = true;},

    num: (pow)=> {pow.node.num = 42;},

    str: (pow)=> {pow.node.str = 'PowJS';},

    arr: (pow)=> {pow.node.arr = ['P', 'o', 'w', 'J', 'S'];},

    obj: (pow)=> {pow.node.obj = { org: 'powjs', repo: 'powjs' };},
  })
);

export const ComponentWithImperativeEvent = compile(`
  <div>
    <div id="handled">
      {{this.x.eventHandled}}
    </div>
    <ce-with-event id="wc" do="this.x.initEvent(this)"></ce-with-event>
  </div>`,
  ()=>({
    eventHandled: false,
    handleTestEvent: function (event) {
      this.x.eventHandled = true;
      event.target.previousSibling.textContent = 'true';
    },

    initEvent: function (pow) {
      pow.node.addEventListener(
        'camelEvent',
        pow.x.handleTestEvent.bind(pow)
      );
    },
  })
);


export const ComponentWithDeclarativeEvent = compile(`
  <div render="this.x">
    <div func="lowercase" id="lowercase">{{v.lowercaseHandled}}</div>
    <div func="kebab" id="kebab">{{v.kebabHandled}}</div>
    <div func="camel" id="camel">{{v.camelHandled}}</div>
    <div func="caps" id="caps">{{v.capsHandled}}</div>
    <div func="pascal" id="pascal">{{v.pascalHandled}}</div>
    <ce-with-event id="wc" do="v.initEvent(this)"></ce-with-event>
  </div>`,
  ()=>({
    lowercaseHandled: false,
    kebabHandled: false,
    camelHandled: false,
    capsHandled: false,
    pascalHandled: false,
    initEvent: function (pow) {
      let node = pow.node;
      node.addEventListener('lowercaseevent', pow.x.handleLowercaseEvent.bind(pow));
      node.addEventListener('kebab-event', pow.x.handleKebabEvent.bind(pow));
      node.addEventListener('camelEvent', pow.x.handleCamelEvent.bind(pow));
      node.addEventListener('CAPSevent', pow.x.handleCapsEvent.bind(pow));
      node.addEventListener('PascalEvent', pow.x.handlePascalEvent.bind(pow));
    },

    handleLowercaseEvent: function (event) {
      this.x.lowercaseHandled = true;
      event.target.parentNode.querySelector('#lowercase').textContent = 'true';
    },

    handleKebabEvent: function (event) {
      this.x.kebabHandled = true;
      event.target.parentNode.querySelector('#kebab').textContent = 'true';
    },

    handleCamelEvent: function (event) {
      this.x.camelHandled = true;
      event.target.parentNode.querySelector('#camel').textContent = 'true';
    },

    handleCapsEvent: function (event) {
      this.x.capsHandled = true;
      event.target.parentNode.querySelector('#caps').textContent = 'true';
    },

    handlePascalEvent: function (event) {
      this.x.pascalHandled = true;
      event.target.parentNode.querySelector('#pascal').textContent = 'true';
    },
  })
);
