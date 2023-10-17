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

import { render } from 'solid-js/web';
import { expect } from "chai";
import {
  ComponentWithProperties,
  ComponentWithInheritance,
  ComponentWithDeclarativeEvent
} from "./components";

describe("advanced support", function() {

  afterEach(function() { document.body.innerHTML = ""; });

  describe("attributes and properties", function() {
    it("will pass array data as a property", function() {
      this.weight = 2;
      let wc;
      render(() => wc = <ComponentWithProperties />, document.body);
      let data = wc.arr;
      expect(data).to.eql(["S", "o", "l", "i", "d"]);
    });

    it("will pass object data as a property", function() {
      this.weight = 2;
      let wc;
      render(() => wc = <ComponentWithProperties />, document.body);
      let data = wc.obj;
      expect(data).to.eql({ org: "ryansolid", repo: "solid" });
    });

    it("will pass object data to a camelCase-named property", function() {
      this.weight = 2;
      let wc;
      render(() => wc = <ComponentWithProperties />, document.body);
      let data = wc.camelCaseObj;
      expect(data).to.eql({ label: "passed" });
    });

    it("will pass object data to inherited properties", function() {
      this.weight = 2;
      let wc;
      render(() => wc = <ComponentWithInheritance />, document.body);
      expect(wc.arr).to.eql(["S", "o", "l", "i", "d"]);
      expect(wc.obj).to.eql({ org: "ryansolid", repo: "solid" });
      expect(wc.camelCaseObj).to.eql({ label: "passed" });
    });

  });

  describe("events", function() {
    it("can declaratively listen to a lowercase DOM event dispatched by a Custom Element", function() {
      this.weight = 2;
      let root;
      render(() => root = <ComponentWithDeclarativeEvent />, document.body);
      let wc = root[5];
      let handled = root[0];
      expect(handled.textContent).to.eql("false");
      wc.click();
      expect(handled.textContent).to.eql("true");
    });

    it("can declaratively listen to a kebab-case DOM event dispatched by a Custom Element", function() {
      this.weight = 1;
      let root;
      render(() => root = <ComponentWithDeclarativeEvent />, document.body);
      let wc = root[5];
      let handled = root[1];
      expect(handled.textContent).to.eql("false");
      wc.click();
      expect(handled.textContent).to.eql("true");
    });

    it("can declaratively listen to a camelCase DOM event dispatched by a Custom Element", function() {
      this.weight = 1;
      let root;
      render(() => root = <ComponentWithDeclarativeEvent />, document.body);
      let wc = root[5];
      let handled = root[2];
      expect(handled.textContent).to.eql("false");
      wc.click();
      expect(handled.textContent).to.eql("true");
    });

    it("can declaratively listen to a CAPScase DOM event dispatched by a Custom Element", function() {
      this.weight = 1;
      let root;
      render(() => root = <ComponentWithDeclarativeEvent />, document.body);
      let wc = root[5];
      let handled = root[3];
      expect(handled.textContent).to.eql("false");
      wc.click();
      expect(handled.textContent).to.eql("true");
    });

    it("can declaratively listen to a PascalCase DOM event dispatched by a Custom Element", function() {
      this.weight = 1;
      let root;
      render(() => root = <ComponentWithDeclarativeEvent />, document.body);
      let wc = root[5];
      let handled = root[4];
      expect(handled.textContent).to.eql("false");
      wc.click();
      expect(handled.textContent).to.eql("true");
    });
  });

});
