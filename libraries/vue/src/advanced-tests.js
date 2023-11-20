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

import {createApp, nextTick} from 'vue';
import {
  ComponentWithoutChildren,
  ComponentWithChildren,
  ComponentWithChildrenRerender,
  ComponentWithDifferentViews,
  ComponentWithProperties,
  ComponentWithInheritance,
  ComponentWithUnregistered,
  ComponentWithImperativeEvent,
  ComponentWithDeclarativeEvent
} from "./components";
import { expect } from "chai";

const isCustomElement = (tagName) => {
  return window.customElements.get(tagName) !== undefined;
}

// Setup the test harness. This will get cleaned out with every test.
const container = document.createElement("div");
document.body.appendChild(container);
let scratch; // This will hold the actual element under test.

beforeEach(function() {
  scratch = document.createElement("div");
  scratch.id = "scratch";
  container.appendChild(scratch);
});

afterEach(function() {
  container.innerHTML = "";
  scratch = null;
});

describe("advanced support", function() {

  describe("attributes and properties", function() {
    it("will pass array data as a property", function() {
      this.weight = 2;
      const app = createApp(ComponentWithProperties)
      app.config.compilerOptions.isCustomElement = isCustomElement;
      app.mount(scratch);
      const wc = scratch.querySelector("#wc");
      const data = wc.arr;
      expect(data).to.eql(["V", "u", "e"]);
    });

    it("will pass object data as a property", function() {
      this.weight = 2;
      const app = createApp(ComponentWithProperties)
      app.config.compilerOptions.isCustomElement = isCustomElement;
      app.mount(scratch);
      const wc = scratch.querySelector("#wc");
      const data = wc.obj;
      expect(data).to.eql({ org: "vuejs", repo: "vue" });
    });

    it("will pass object data to a camelCase-named property", function() {
      this.weight = 2;
      const app = createApp(ComponentWithProperties)
      app.config.compilerOptions.isCustomElement = isCustomElement;
      app.mount(scratch);
      const wc = scratch.querySelector("#wc");
      const data = wc.camelCaseObj;
      expect(data).to.eql({ label: "passed" });
    });

    it("will pass object data to inherited properties", function() {
      this.weight = 2;
      const app = createApp(ComponentWithInheritance)
      app.config.compilerOptions.isCustomElement = isCustomElement;
      app.mount(scratch);
      const wc = scratch.querySelector("#wc");
      expect(wc.arr).to.eql(["V", "u", "e"]);
      expect(wc.obj).to.eql({ org: "vuejs", repo: "vue" });
    });

  });

  describe("events", function() {
    it("can declaratively listen to a lowercase DOM event dispatched by a Custom Element", async function() {
      this.weight = 2;
      const app = createApp(ComponentWithDeclarativeEvent)
      app.config.compilerOptions.isCustomElement = isCustomElement;
      app.mount(scratch);
      const wc = scratch.querySelector("#wc");
      const handled = scratch.querySelector("#lowercase");
      expect(handled.textContent).to.eql("false");
      wc.click();
      await nextTick();
      expect(handled.textContent).to.eql("true");
    });

    it("can declaratively listen to a kebab-case DOM event dispatched by a Custom Element", async function() {
      this.weight = 1;
      const app = createApp(ComponentWithDeclarativeEvent)
      app.config.compilerOptions.isCustomElement = isCustomElement;
      app.mount(scratch);
      const wc = scratch.querySelector("#wc");
      const handled = scratch.querySelector("#kebab");
      expect(handled.textContent).to.eql("false");
      wc.click();
      await nextTick();
      expect(handled.textContent).to.eql("true");
    });

    it("can declaratively listen to a camelCase DOM event dispatched by a Custom Element", async function() {
      this.weight = 1;
      const app = createApp(ComponentWithDeclarativeEvent)
      app.config.compilerOptions.isCustomElement = isCustomElement;
      app.mount(scratch);
      const wc = scratch.querySelector("#wc");
      const handled = scratch.querySelector("#camel");
      expect(handled.textContent).to.eql("false");
      wc.click();
      await nextTick();
      expect(handled.textContent).to.eql("true");
    });

    it("can declaratively listen to a CAPScase DOM event dispatched by a Custom Element", async function() {
      this.weight = 1;
      const app = createApp(ComponentWithDeclarativeEvent)
      app.config.compilerOptions.isCustomElement = isCustomElement;
      app.mount(scratch);
      const wc = scratch.querySelector("#wc");
      const handled = scratch.querySelector("#caps");
      expect(handled.textContent).to.eql("false");
      wc.click();
      await nextTick();
      expect(handled.textContent).to.eql("true");
    });

    it("can declaratively listen to a PascalCase DOM event dispatched by a Custom Element", async function() {
      this.weight = 1;
      const app = createApp(ComponentWithDeclarativeEvent)
      app.config.compilerOptions.isCustomElement = isCustomElement;
      app.mount(scratch);
      const wc = scratch.querySelector("#wc");
      const handled = scratch.querySelector("#pascal");
      expect(handled.textContent).to.eql("false");
      wc.click();
      await nextTick();
      expect(handled.textContent).to.eql("true");
    });
  });

});
