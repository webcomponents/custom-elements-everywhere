import { h, render } from "omi";
import { expect } from "chai";

import "./components";

// Setup the test harness. This will get cleaned out with every test.
let app = document.createElement("div");
app.id = "app";
document.body.appendChild(app);
let scratch; // This will hold the actual element under test.

beforeEach(function () {
  scratch = document.createElement("div");
  scratch.id = "scratch";
  app.appendChild(scratch);
});

afterEach(function () {
  app.innerHTML = "";
  scratch = null;
});

describe("advanced support", function () {

  describe("attributes and properties", function () {
    it("will pass array data as a property", function () {
      this.weight = 2;
      let root = render(<component-with-properties />, scratch);
      let wc = root.shadowRoot.querySelector("#wc");
      let data = wc.arr;
      expect(data).to.eql(["O", "m", "i"]);
    });

    it("will pass object data as a property", function () {
      this.weight = 2;
      let root = render(<component-with-properties />, scratch);
      let wc = root.shadowRoot.querySelector("#wc");
      let data = wc.obj;
      expect(data).to.eql({ org: "tencent", repo: "omi" });
    });
  });

  describe("events", function () {
    it("can declaratively listen to a lowercase DOM event dispatched by a Custom Element", function () {
      this.weight = 2;
      let root = render(<component-with-declarative-event />, scratch);

      let wc = root.shadowRoot.querySelector("#wc");
      expect(wc).to.exist;
      let handled = root.shadowRoot.querySelector("#lowercase");
      expect(handled.textContent).to.eql("false");
      wc.click();
      root.update();
      expect(handled.textContent).to.eql("true");
    });

    it("can declaratively listen to a kebab-case DOM event dispatched by a Custom Element", function () {
      this.weight = 1;
      let root = render(<component-with-declarative-event />, scratch);
      let wc = root.shadowRoot.querySelector("#wc");
      let handled = root.shadowRoot.querySelector("#kebab");
      expect(handled.textContent).to.eql("false");
      wc.click();
      root.update();
      expect(handled.textContent).to.eql("true");
    });

    it("can declaratively listen to a camelCase DOM event dispatched by a Custom Element", function () {
      this.weight = 1;
      let root = render(<component-with-declarative-event />, scratch);
      let wc = root.shadowRoot.querySelector("#wc");
      let handled = root.shadowRoot.querySelector("#camel");
      expect(handled.textContent).to.eql("false");
      wc.click();
      root.update();
      expect(handled.textContent).to.eql("true");
    });

    it("can declaratively listen to a CAPScase DOM event dispatched by a Custom Element", function () {
      this.weight = 1;
      let root = render(<component-with-declarative-event />, scratch);
      let wc = root.shadowRoot.querySelector("#wc");
      let handled = root.shadowRoot.querySelector("#caps");
      expect(handled.textContent).to.eql("false");
      wc.click();
      root.update();
      expect(handled.textContent).to.eql("true");
    });

    it("can declaratively listen to a PascalCase DOM event dispatched by a Custom Element", function () {
      this.weight = 1;
      let root = render(<component-with-declarative-event />, scratch);
      let wc = root.shadowRoot.querySelector("#wc");
      let handled = root.shadowRoot.querySelector("#pascal");
      expect(handled.textContent).to.eql("false");
      wc.click();
      root.update();
      expect(handled.textContent).to.eql("true");
    });
  });

});
