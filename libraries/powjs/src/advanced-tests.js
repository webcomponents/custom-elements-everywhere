import { expect } from "chai";
import {
  ComponentWithoutChildren,
  ComponentWithChildren,
  ComponentWithChildrenRerender,
  ComponentWithDifferentViews,
  ComponentWithProperties,
  ComponentWithUnregistered,
  ComponentWithImperativeEvent,
  ComponentWithDeclarativeEvent
} from "./components";

import powjs from 'powjs';

function instance(comb) {
  return powjs(comb[0], comb[1] && comb[1]());
}

// Setup the test harness. This will get cleaned out with every test.
let app = document.createElement("div");
app.id = "app";
document.body.appendChild(app);
let box; // This will hold the actual element under test.

beforeEach(function() {
  box = document.createElement("div");
  app.appendChild(box);
});

afterEach(function() {
  app.innerHTML = "";
  box = null;
});

describe("advanced support", function() {

  describe("attributes and properties", function() {
    it("will pass array data as a property", function() {
      this.weight = 2;
      instance(ComponentWithProperties).render().appendTo(box);
      let wc = box.querySelector("#wc");
      let data = wc.arr;
      expect(data).to.eql(['P', 'o', 'w', 'J', 'S']);
    });

    it("will pass object data as a property", function() {
      this.weight = 2;
      instance(ComponentWithProperties).render().appendTo(box);
      let wc = box.querySelector("#wc");
      let data = wc.obj;
      expect(data).to.eql({ org: "powjs", repo: "powjs" });
    });
  });

  describe("events", function() {
    it("can declaratively listen to a lowercase DOM event dispatched by a Custom Element", function() {
      this.weight = 2;
      let comp = instance(ComponentWithDeclarativeEvent);
      comp.node= comp.parent = box;
      comp.render();
      let wc = box.querySelector("#wc");
      expect(wc).to.exist;
      let handled = box.querySelector("#lowercase");
      expect(handled.textContent).to.eql("false");
      wc.click();
      expect(handled.textContent).to.eql("true");
    });

    it("can declaratively listen to a kebab-case DOM event dispatched by a Custom Element", function() {
      this.weight = 1;
      let comp = instance(ComponentWithDeclarativeEvent);
      comp.node= comp.parent = box;
      comp.render();
      let wc = box.querySelector("#wc");
      let handled = box.querySelector("#kebab");
      expect(handled.textContent).to.eql("false");
      wc.click();
      expect(handled.textContent).to.eql("true");
    });

    it("can declaratively listen to a camelCase DOM event dispatched by a Custom Element", function() {
      this.weight = 1;
      let comp = instance(ComponentWithDeclarativeEvent);
      comp.node= comp.parent = box;
      comp.render();
      let wc = box.querySelector("#wc");
      let handled = box.querySelector("#camel");
      expect(handled.textContent).to.eql("false");
      wc.click();
      expect(handled.textContent).to.eql("true");
    });

    it("can declaratively listen to a CAPScase DOM event dispatched by a Custom Element", function() {
      this.weight = 1;
      let comp = instance(ComponentWithDeclarativeEvent);
      comp.node= comp.parent = box;
      comp.render();
      let wc = box.querySelector("#wc");
      let handled = box.querySelector("#caps");
      expect(handled.textContent).to.eql("false");
      wc.click();
      expect(handled.textContent).to.eql("true");
    });

    it("can declaratively listen to a PascalCase DOM event dispatched by a Custom Element", function() {
      this.weight = 1;
      let comp = instance(ComponentWithDeclarativeEvent);
      comp.node= comp.parent = box;
      comp.render();
      let wc = box.querySelector("#wc");
      let handled = box.querySelector("#pascal");
      expect(handled.textContent).to.eql("false");
      wc.click();
      expect(handled.textContent).to.eql("true");
    });
  });

});
