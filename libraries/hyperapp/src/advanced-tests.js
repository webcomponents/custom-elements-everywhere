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

import {
  ComponentWithoutChildren,
  ComponentWithChildren,
  ComponentWithChildrenRerender,
  ComponentWithDifferentViews,
  ComponentWithProperties,
  ComponentWithImperativeEvent,
  ComponentWithDeclarativeEvent
} from "./components";

// Setup the test harness. This will get cleaned out with every test.
let testContainer = document.createElement("div");
testContainer.id = "testContainer";
document.body.appendChild(testContainer);
let root; //this will be the node that gets replaced by running app

beforeEach(function () {
  root = document.createElement("div");
  testContainer.appendChild(root);
});

afterEach(function () {
  testContainer.innerHTML = "";
  root = null;
});

describe("advanced support", function () {
  describe("attributes and properties", function () {
    it("will pass array data as a property", async function () {
      this.weight = 2;
      ComponentWithProperties(root);
      await new Promise(requestAnimationFrame);
      let wc = testContainer.querySelector("#wc");
      expect(wc.arr).to.eql(["H", "y", "p", "e", "r", "a", "p", "p"]);
    });
    it("will pass object data as a property", async function () {
      this.weight = 2;
      ComponentWithProperties(root);
      await new Promise(requestAnimationFrame);
      let wc = testContainer.querySelector("#wc");
      expect(wc.obj).to.eql({ org: "Hyperapp", repo: "hyperapp.js" });
    });
  });
  describe("events", function () {
    it("can declaratively listen to a lowercase DOM event dispatched by a Custom Element", async function () {
      this.weight = 2;
      ComponentWithDeclarativeEvent(root);
      await new Promise(requestAnimationFrame);
      let wc = testContainer.querySelector("#wc");
      expect(wc).to.exist;
      let handled = testContainer.querySelector("#lowercase");
      expect(handled.textContent).to.eql("false");
      wc.click();
      await new Promise(requestAnimationFrame);
      expect(handled.textContent).to.eql("true");
    });

    it("can declaratively listen to a kebab-case DOM event dispatched by a Custom Element", async function () {
      this.weight = 1;
      ComponentWithDeclarativeEvent(root);
      await new Promise(requestAnimationFrame);
      let wc = testContainer.querySelector("#wc");
      let handled = testContainer.querySelector("#lowercase");
      expect(handled.textContent).to.eql("false");
      wc.click();
      await new Promise(requestAnimationFrame);
      expect(handled.textContent).to.eql("true");
    });

    it("can declaratively listen to a camelCase DOM event dispatched by a Custom Element", async function () {
      this.weight = 1;
      ComponentWithDeclarativeEvent(root);
      await new Promise(requestAnimationFrame);
      let wc = testContainer.querySelector("#wc");
      let handled = testContainer.querySelector("#lowercase");
      expect(handled.textContent).to.eql("false");
      wc.click();
      await new Promise(requestAnimationFrame);
      expect(handled.textContent).to.eql("true");
    });
    it("can declaratively listen to a CAPScase DOM event dispatched by a Custom Element", async function () {
      this.weight = 1;
      ComponentWithDeclarativeEvent(root);
      await new Promise(requestAnimationFrame);
      let wc = testContainer.querySelector("#wc");
      let handled = testContainer.querySelector("#lowercase");
      expect(handled.textContent).to.eql("false");
      wc.click();
      await new Promise(requestAnimationFrame);
      expect(handled.textContent).to.eql("true");
    });

    it("can declaratively listen to a PascalCase DOM event dispatched by a Custom Element", async function () {
      this.weight = 1;
      ComponentWithDeclarativeEvent(root);
      await new Promise(requestAnimationFrame);
      let wc = testContainer.querySelector("#wc");
      let handled = testContainer.querySelector("#lowercase");
      expect(handled.textContent).to.eql("false");
      wc.click();
      await new Promise(requestAnimationFrame);
      expect(handled.textContent).to.eql("true");
    });
  });
});
