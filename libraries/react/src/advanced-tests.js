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

import React from "react";
import ReactDOM from "react-dom";
import ReactTestUtils from "react-dom/test-utils";
import expect from "expect";
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

  describe("events", function() {
    it("can declaratively listen to a lowercase DOM event dispatched by a Custom Element", function() {
      let root = ReactDOM.render(<ComponentWithDeclarativeEvent />, scratch);
      let wc = root.wc;
      let handled = root.lowercase;
      expect(handled.textContent).toEqual("false");
      wc.click();
      root.forceUpdate();
      expect(handled.textContent).toEqual("true");
    });

    it("can declaratively listen to a kebab-case DOM event dispatched by a Custom Element", function() {
      let root = ReactDOM.render(<ComponentWithDeclarativeEvent />, scratch);
      let wc = root.wc;
      let handled = root.kebab;
      expect(handled.textContent).toEqual("false");
      wc.click();
      root.forceUpdate();
      expect(handled.textContent).toEqual("true");
    });

    it("can declaratively listen to a camelCase DOM event dispatched by a Custom Element", function() {
      let root = ReactDOM.render(<ComponentWithDeclarativeEvent />, scratch);
      let wc = root.wc;
      let handled = root.camel;
      expect(handled.textContent).toEqual("false");
      wc.click();
      root.forceUpdate();
      expect(handled.textContent).toEqual("true");
    });

    it("can declaratively listen to a CAPScase DOM event dispatched by a Custom Element", function() {
      let root = ReactDOM.render(<ComponentWithDeclarativeEvent />, scratch);
      let wc = root.wc;
      let handled = root.caps;
      expect(handled.textContent).toEqual("false");
      wc.click();
      root.forceUpdate();
      expect(handled.textContent).toEqual("true");
    });

    it("can declaratively listen to a PascalCase DOM event dispatched by a Custom Element", function() {
      let root = ReactDOM.render(<ComponentWithDeclarativeEvent />, scratch);
      let wc = root.wc;
      let handled = root.pascal;
      expect(handled.textContent).toEqual("false");
      wc.click();
      root.forceUpdate();
      expect(handled.textContent).toEqual("true");
    });
  });

});
