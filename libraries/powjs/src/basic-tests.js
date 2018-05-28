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

describe("basic support", function() {

  describe("no children", function() {
    it("can display a Custom Element with no children", function() {
      this.weight = 3;

      instance(ComponentWithoutChildren).render().appendTo(box);

      let wc = box.querySelector("#wc");
      expect(wc).to.exist;
    });
  });

  describe("with children", function() {
    function expectHasChildren(wc) {
      expect(wc).to.exist;
      let shadowRoot = wc.shadowRoot;
      let heading = shadowRoot.querySelector("h1");
      expect(heading).to.exist;
      expect(heading.textContent).to.eql("Test h1");
      let paragraph = shadowRoot.querySelector("p");
      expect(paragraph).to.exist;
      expect(paragraph.textContent).to.eql("Test p");
    }

    it("can display a Custom Element with children in a Shadow Root", function() {
      this.weight = 3;
      instance(ComponentWithChildren).render().appendTo(box);
      let wc = box.querySelector("#wc");
      expectHasChildren(wc);
    });

    it("can display a Custom Element with children in a Shadow Root and pass in Light DOM children", async function() {
      this.weight = 3;
      instance(ComponentWithChildrenRerender).render().appendTo(box);
      let wc = box.querySelector("#wc");

      await new Promise(function(resolve, reject) {
        setTimeout(resolve, 0);
      });

      expectHasChildren(wc);
      expect(wc.textContent.includes("2")).to.be.true;
    });

    it("can display a Custom Element with children in the Shadow DOM and handle hiding and showing the element", function(done) {
      this.weight = 3;
      let comp = instance(ComponentWithDifferentViews);
      comp.render().appendTo(box);
      let wc = box.querySelector("#wc");
      expectHasChildren(wc);

      box.innerHTML = '';
      comp.x.toggle();
      comp.render().appendTo(box);
      let dummy = box.querySelector("#dummy");
      expect(dummy).to.exist;
      expect(dummy.textContent).to.eql("Dummy view");

      box.innerHTML = '';
      comp.x.toggle();
      comp.render().appendTo(box);
      wc = box.querySelector("#wc");
      expectHasChildren(wc);
      done();
    });
  });

  describe("attributes and properties", function() {
    it("will pass boolean data as either an attribute or a property", function() {
      this.weight = 3;
      instance(ComponentWithProperties).render().appendTo(box);
      let wc = box.querySelector("#wc");
      let data = wc.bool || wc.hasAttribute("bool");
      expect(data).to.be.true;
    });

    it("will pass numeric data as either an attribute or a property", function() {
      this.weight = 3;
      instance(ComponentWithProperties).render().appendTo(box);
      let wc = box.querySelector("#wc");
      let data = wc.num || wc.getAttribute("num");
      expect(parseInt(data, 10)).to.eql(42);
    });

    it("will pass string data as either an attribute or a property", function() {
      this.weight = 3;
      instance(ComponentWithProperties).render().appendTo(box);
      let wc = box.querySelector("#wc");
      let data = wc.str || wc.getAttribute("str");
      expect(data).to.eql("PowJS");
    });
  });

  describe("events", function() {
    it("can imperatively listen to a DOM event dispatched by a Custom Element", function() {
      this.weight = 3;
      instance(ComponentWithImperativeEvent).render().appendTo(box);

      let wc = box.querySelector("#wc");
      expect(wc).to.exist;
      let handled = box.querySelector("#handled");
      expect(handled.textContent).to.eql("false");
      wc.click();
      expect(handled.textContent).to.eql("true");
    });
  });

});
