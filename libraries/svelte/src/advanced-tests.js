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
  ComponentWithProperties,
  ComponentWithDeclarativeEvent
} from "./components";

// Setup the test harness. This will get cleaned out with every test.
let app = document.createElement("div");
app.id = "app";
document.body.appendChild(app);
let scratch; // This will hold the actual element under test.

beforeEach(function() {
  scratch = document.createElement("div");
  scratch.id = "scratch";
  app.appendChild(scratch);
});

afterEach(function() {
  app.innerHTML = "";
  scratch = null;
});

describe("advanced support", function() {

  describe("attributes and properties", function() {
    it("will pass array data as a property", function() {
      this.weight = 2;
      new ComponentWithProperties({ target: scratch });
      let wc = scratch.querySelector("#wc");
      let data = wc.arr;
      expect(data).to.eql(["s", "v", "e", "l", "t", "e"]);
    });

    it("will pass object data as a property", function() {
      this.weight = 2;
      new ComponentWithProperties({ target: scratch });
      let wc = scratch.querySelector("#wc");
      let data = wc.obj;
      expect(data).to.eql({ org: "sveltejs", repo: "svelte" });
    });
  });

  describe("events", function() {
    it("can declaratively listen to a lowercase DOM event dispatched by a Custom Element", function() {
      this.weight = 2;
      new ComponentWithDeclarativeEvent({ target: scratch });
      let wc = scratch.querySelector("#wc");
      expect(wc).to.exist;
      let handled = scratch.querySelector("#lowercase");
      expect(handled.textContent).to.eql("false");
      wc.click();
      expect(handled.textContent).to.eql("true");
    });

    it("can declaratively listen to a kebab-case DOM event dispatched by a Custom Element", function() {
      this.weight = 1;
      new ComponentWithDeclarativeEvent({ target: scratch });
      let wc = scratch.querySelector("#wc");
      let handled = scratch.querySelector("#kebab");
      expect(handled.textContent).to.eql("false");
      wc.click();
      expect(handled.textContent).to.eql("true");
    });

    it("can declaratively listen to a camelCase DOM event dispatched by a Custom Element", function() {
      this.weight = 1;
      new ComponentWithDeclarativeEvent({ target: scratch });
      let wc = scratch.querySelector("#wc");
      let handled = scratch.querySelector("#camel");
      expect(handled.textContent).to.eql("false");
      wc.click();
      expect(handled.textContent).to.eql("true");
    });

    it("can declaratively listen to a CAPScase DOM event dispatched by a Custom Element", function() {
      this.weight = 1;
      new ComponentWithDeclarativeEvent({ target: scratch });
      let wc = scratch.querySelector("#wc");
      let handled = scratch.querySelector("#caps");
      expect(handled.textContent).to.eql("false");
      wc.click();
      expect(handled.textContent).to.eql("true");
    });

    it("can declaratively listen to a PascalCase DOM event dispatched by a Custom Element", function() {
      this.weight = 1;
      new ComponentWithDeclarativeEvent({ target: scratch });
      let wc = scratch.querySelector("#wc");
      let handled = scratch.querySelector("#pascal");
      expect(handled.textContent).to.eql("false");
      wc.click();
      expect(handled.textContent).to.eql("true");
    });
  });

});
