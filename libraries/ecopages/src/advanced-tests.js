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

import { createRoot } from "@ecopages/jsx/client";
import { expect } from "chai";
import {
  ComponentWithProperties,
  ComponentWithDeclarativeEvent,
} from "./components";

let mount;
let jsxRoot;

beforeEach(function () {
  mount = document.createElement("div");
  document.body.appendChild(mount);
  jsxRoot = createRoot(mount);
});

afterEach(function () {
  jsxRoot.unmount();
  document.body.innerHTML = "";
  mount = null;
  jsxRoot = null;
});

function renderIntoMount(element) {
  jsxRoot.render(element);
  return mount;
}

describe("advanced support", function () {
  describe("attributes and properties", function () {
    it("will pass array data as a property", function () {
      this.weight = 2;
      let root = renderIntoMount(<ComponentWithProperties />);
      let wc = root.querySelector("ce-with-properties");
      let data = wc.arr;
      expect(data).to.eql(["E", "c", "o", "p", "a", "g", "e", "s"]);
    });

    it("will pass object data as a property", function () {
      this.weight = 2;
      let root = renderIntoMount(<ComponentWithProperties />);
      let wc = root.querySelector("ce-with-properties");
      let data = wc.obj;
      expect(data).to.eql({ org: "ecopages", repo: "ecopages" });
    });

    it("will pass object data to a camelCase-named property", function () {
      this.weight = 2;
      let root = renderIntoMount(<ComponentWithProperties />);
      let wc = root.querySelector("ce-with-properties");
      let data = wc.camelCaseObj;
      expect(data).to.eql({ label: "passed" });
    });
  });

  describe("events", function () {
    it("can declaratively listen to a lowercase DOM event dispatched by a Custom Element", function () {
      this.weight = 2;
      let root = renderIntoMount(<ComponentWithDeclarativeEvent />);
      let wc = root.querySelector("#wc");
      let handled = root.querySelector("#lowercase");
      expect(handled.textContent).to.eql("false");
      wc.click();
      expect(handled.textContent).to.eql("true");
    });

    it("can declaratively listen to a kebab-case DOM event dispatched by a Custom Element", function () {
      this.weight = 1;
      let root = renderIntoMount(<ComponentWithDeclarativeEvent />);
      let wc = root.querySelector("#wc");
      let handled = root.querySelector("#kebab");
      expect(handled.textContent).to.eql("false");
      wc.click();
      expect(handled.textContent).to.eql("true");
    });

    it("can declaratively listen to a camelCase DOM event dispatched by a Custom Element", function () {
      this.weight = 1;
      let root = renderIntoMount(<ComponentWithDeclarativeEvent />);
      let wc = root.querySelector("#wc");
      let handled = root.querySelector("#camel");
      expect(handled.textContent).to.eql("false");
      wc.click();
      expect(handled.textContent).to.eql("true");
    });

    it("can declaratively listen to a CAPScase DOM event dispatched by a Custom Element", function () {
      this.weight = 1;
      let root = renderIntoMount(<ComponentWithDeclarativeEvent />);
      let wc = root.querySelector("#wc");
      let handled = root.querySelector("#caps");
      expect(handled.textContent).to.eql("false");
      wc.click();
      expect(handled.textContent).to.eql("true");
    });

    it("can declaratively listen to a PascalCase DOM event dispatched by a Custom Element", function () {
      this.weight = 1;
      let root = renderIntoMount(<ComponentWithDeclarativeEvent />);
      let wc = root.querySelector("#wc");
      let handled = root.querySelector("#pascal");
      expect(handled.textContent).to.eql("false");
      wc.click();
      expect(handled.textContent).to.eql("true");
    });
  });
});
