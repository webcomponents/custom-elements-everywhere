import { expect } from "chai";
import "./components";

describe("advanced support", function() {

  describe("attributes and properties", function() {
    it("will pass array data as a property", function() {
      this.weight = 2;
      let root = document.createElement('component-with-properties');
      document.body.append(root);
      let wc = root.querySelector("#wc");
      let data = wc.arr;
      expect(data).to.eql(["I", "b", "y", "a", "r"]);
      root.remove();
    });

    it("will pass object data as a property", function() {
      this.weight = 2;
      let root = document.createElement('component-with-properties');
      document.body.append(root);
      let wc = root.querySelector("#wc");
      let data = wc.obj;
      expect(data).to.eql({ org: "ibyar", repo: "ibyar" });
      root.remove();
    });
  });

  describe("events", function() {
    it("can declaratively listen to a lowercase DOM event dispatched by a Custom Element", function() {
      this.weight = 2;
      let root = document.createElement('component-with-declarative-event');
      document.body.append(root);
      let wc = root.querySelector("#wc");
      let handled = root.querySelector("#lowercase");
      expect(handled.textContent).to.eql("false");
      wc.click();
      expect(handled.textContent).to.eql("true");
      root.remove();
    });

    it("can declaratively listen to a kebab-case DOM event dispatched by a Custom Element", function() {
      this.weight = 1;
      let root = document.createElement('component-with-declarative-event');
      document.body.append(root);
      let wc = root.querySelector("#wc");
      let handled = root.querySelector("#kebab");
      expect(handled.textContent).to.eql("false");
      wc.click();
      expect(handled.textContent).to.eql("true");
      root.remove();
    });

    it("can declaratively listen to a camelCase DOM event dispatched by a Custom Element", function() {
      this.weight = 1;
      let root = document.createElement('component-with-declarative-event');
      document.body.append(root);
      let wc = root.querySelector("#wc");
      let handled = root.querySelector("#camel");
      expect(handled.textContent).to.eql("false");
      wc.click();
      expect(handled.textContent).to.eql("true");
      root.remove();
    });

    it("can declaratively listen to a CAPScase DOM event dispatched by a Custom Element", function() {
      this.weight = 1;
      let root = document.createElement('component-with-declarative-event');
      document.body.append(root);
      let wc = root.querySelector("#wc");
      let handled = root.querySelector("#caps");
      expect(handled.textContent).to.eql("false");
      wc.click();
      expect(handled.textContent).to.eql("true");
      root.remove();
    });

    it("can declaratively listen to a PascalCase DOM event dispatched by a Custom Element", function() {
      this.weight = 1;
      let root = document.createElement('component-with-declarative-event');
      document.body.append(root);
      let wc = root.querySelector("#wc");
      let handled = root.querySelector("#pascal");
      expect(handled.textContent).to.eql("false");
      wc.click();
      expect(handled.textContent).to.eql("true");
      root.remove();
    });
  });

});
