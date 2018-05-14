import { expect } from "chai";
import prodApp from "./app.module";

describe("advanced support", () => {

  beforeEach(angular.mock.module(prodApp));

  let compile;
  let scope;
  let interval;
  beforeEach(
    inject(($compile, $rootScope, $interval) => {
      compile = $compile;
      scope = $rootScope.$new();
      interval = $interval;
    })
  );

  describe("attributes and properties", () => {
    const prep = el => {
      return compile(el)(scope)[0];
    }

    it("will pass array data as a property", function() {
      this.weight = 2;
      let root = prep("<comp-with-props>")
      scope.$digest()
      let wc = root.querySelector('#wc')
      let data = wc.arr;
      expect(data).to.eql(['A', 'n', 'g', 'u', 'l', 'a', 'r']);
    });

    it("will pass object data as a property", function() {
      this.weight = 2;
      let root = prep("<comp-with-props>")
      scope.$digest()
      let wc = root.querySelector('#wc')
      let data = wc.obj;
      expect(data).to.eql({ org: "angular", repo: "angular" });
    });
  });

  describe("events", () => {
    it("can declaratively listen to a lowercase DOM event dispatched by a Custom Element", function() {
      this.weight = 2;
      const root = compile("<comp-with-declarative-event>")(scope)[0];
      scope.$digest();
      let wc = root.querySelector("#wc");
      let handled = root.querySelector("#lowercase");
      expect(handled.textContent).to.eql("false");
      wc.click();
      scope.$digest();
      expect(handled.textContent).to.eql("true");
    });

    it("can declaratively listen to a kebab-case DOM event dispatched by a Custom Element", function() {
      this.weight = 1;
      const root = compile("<comp-with-declarative-event>")(scope)[0];
      scope.$digest();
      let wc = root.querySelector("#wc");
      let handled = root.querySelector("#kebab");
      expect(handled.textContent).to.eql("false");
      wc.click();
      scope.$digest();
      expect(handled.textContent).to.eql("true");
    });

    it("can declaratively listen to a camelCase DOM event dispatched by a Custom Element", function() {
      this.weight = 1;
      const root = compile("<comp-with-declarative-event>")(scope)[0];
      scope.$digest();
      let wc = root.querySelector("#wc");
      let handled = root.querySelector("#camel");
      expect(handled.textContent).to.eql("false");
      wc.click();
      scope.$digest();
      expect(handled.textContent).to.eql("true");
    });

    it("can declaratively listen to a CAPScase DOM event dispatched by a Custom Element", function() {
      this.weight = 1;
      const root = compile("<comp-with-declarative-event>")(scope)[0];
      scope.$digest();
      let wc = root.querySelector("#wc");
      let handled = root.querySelector("#caps");
      expect(handled.textContent).to.eql("false");
      wc.click();
      scope.$digest();
      expect(handled.textContent).to.eql("true");
    });

    it("can declaratively listen to a PascalCase DOM event dispatched by a Custom Element", function() {
      this.weight = 1;
      const root = compile("<comp-with-declarative-event>")(scope)[0];
      scope.$digest();
      let wc = root.querySelector("#wc");
      let handled = root.querySelector("#pascal");
      expect(handled.textContent).to.eql("false");
      wc.click();
      scope.$digest();
      expect(handled.textContent).to.eql("true");
    });
  });
  
});
