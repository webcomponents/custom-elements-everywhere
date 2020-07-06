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

import { expect } from "chai";

import h3 from "@h3rald/h3";

import {
  ComponentWithoutChildren,
  ComponentWithChildren,
  ComponentWithChildrenRerender,
  ComponentWithDifferentViews,
  ComponentWithProperties,
  ComponentWithImperativeEvent,
  ComponentWithDeclarativeEvent,
  eventResults,
} from "./components";


describe("advanced support", function () {
  describe("attributes and properties", function () {
    it("will pass array data as a property", async function () {
      this.weight = 2;
      await h3.init(ComponentWithProperties);
      let wc = document.querySelector("#wc");
      expect(wc.arr).to.eql(["H", "3"]);
    });

    it("will pass object data as a property", async function () {
      this.weight = 2;
      await h3.init(ComponentWithProperties);
      let wc = document.querySelector("#wc");
      expect(wc.obj).to.eql({ org: "h3rald", repo: "h3" });
    });
  });

  describe("events", function () {

    beforeEach(() => {
      eventResults.lowercaseHandled = false;
      eventResults.pascalHandled = false;
      eventResults.kebabHandled = false;
      eventResults.camelHandled = false;
      eventResults.capsHandled = false;
    });

    it("can declaratively listen to a lowercase DOM event dispatched by a Custom Element", async function () {
      this.weight = 2;
      await h3.init(ComponentWithDeclarativeEvent);
      let wc = document.querySelector("#wc");
      expect(wc).to.exist;
      let handled = document.querySelector("#lowercase");
      expect(handled.textContent).to.eql("false");
      wc.click();
      //await new Promise(requestAnimationFrame);
      expect(handled.textContent).to.eql("true");
    });

    it("can declaratively listen to a kebab-case DOM event dispatched by a Custom Element", async function () {
      this.weight = 1;
      await h3.init(ComponentWithDeclarativeEvent);
      let wc = document.querySelector("#wc");
      let handled = document.querySelector("#kebab");
      expect(handled.textContent).to.eql("false");
      wc.click();
      //await new Promise(requestAnimationFrame);
      expect(handled.textContent).to.eql("true");
    });

    it("can declaratively listen to a camelCase DOM event dispatched by a Custom Element", async function () {
      this.weight = 1;
      await h3.init(ComponentWithDeclarativeEvent);
      let wc = document.querySelector("#wc");
      let handled = document.querySelector("#camel");
      expect(handled.textContent).to.eql("false");
      wc.click();
      //await new Promise(requestAnimationFrame);
      expect(handled.textContent).to.eql("true");
    });

    it("can declaratively listen to a CAPScase DOM event dispatched by a Custom Element", async function () {
      this.weight = 1;
      await h3.init(ComponentWithDeclarativeEvent);
      let wc = document.querySelector("#wc");
      let handled = document.querySelector("#caps");
      expect(handled.textContent).to.eql("false");
      wc.click();
      //await new Promise(requestAnimationFrame);
      expect(handled.textContent).to.eql("true");
    });

    it("can declaratively listen to a PascalCase DOM event dispatched by a Custom Element", async function () {
      this.weight = 1;
      await h3.init(ComponentWithDeclarativeEvent);
      let wc = document.querySelector("#wc");
      let handled = document.querySelector("#pascal");
      expect(handled.textContent).to.eql("false");
      wc.click();
      //await new Promise(requestAnimationFrame);
      expect(handled.textContent).to.eql("true");
    });
  });
});
