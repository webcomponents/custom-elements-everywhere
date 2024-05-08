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
import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";
import { expect } from "chai";
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

let reactRoot = null;
function render(element) {
  act(() => {
    reactRoot.render(element);
  });
}

before(() => {
  window.IS_REACT_ACT_ENVIRONMENT = true;
})

after(() => {
  window.IS_REACT_ACT_ENVIRONMENT = false;
})

beforeEach(function() {
  scratch = document.createElement("div");
  scratch.id = "scratch";
  app.appendChild(scratch);

  reactRoot = createRoot(scratch);
});

afterEach(function() {
  app.innerHTML = "";
  scratch = null;

  act(() => {
    reactRoot.unmount();
  });
});

describe("advanced support", function() {

  describe("attributes and properties", function() {
    it("will pass array data as a property", function() {
      this.weight = 2;
      let root;
      render(
        <ComponentWithProperties
          ref={(current) => {
            root = current;
          }}
        />
      );
      let wc = root.wc;
      let data = wc.arr;
      expect(data).to.eql(["R", "e", "a", "c", "t"]);
    });

    it("will pass object data as a property", function() {
      this.weight = 2;
      let root;
      render(
        <ComponentWithProperties
          ref={(current) => {
            root = current;
          }}
        />
      );
      let wc = root.wc;
      let data = wc.obj;
      expect(data).to.eql({ org: "facebook", repo: "react" });
    });

    it("will pass object data to a camelCase-named property", function() {
      this.weight = 2;
      let root;
      render(
        <ComponentWithProperties
          ref={(current) => {
            root = current;
          }}
        />
      );
      let wc = root.wc;
      let data = wc.camelCaseObj;
      expect(data).to.eql({ label: "passed" });
    });
  });

  describe("events", function() {
    it("can declaratively listen to a lowercase DOM event dispatched by a Custom Element", function() {
      this.weight = 2;
      let root;
      render(
        <ComponentWithDeclarativeEvent
          ref={(current) => {
            root = current;
          }}
        />
      );
      let wc = root.wc;
      let handled = root.lowercase;
      expect(handled.textContent).to.eql("false");
      act(() => {
        wc.click();
      });
      expect(handled.textContent).to.eql("true");
    });

    it("can declaratively listen to a kebab-case DOM event dispatched by a Custom Element", function() {
      this.weight = 1;
      let root;
      render(
        <ComponentWithDeclarativeEvent
          ref={(current) => {
            root = current;
          }}
        />
      );
      let wc = root.wc;
      let handled = root.kebab;
      expect(handled.textContent).to.eql("false");
      act(() => {
        wc.click();
      });
      expect(handled.textContent).to.eql("true");
    });

    it("can declaratively listen to a camelCase DOM event dispatched by a Custom Element", function() {
      this.weight = 1;
      let root;
      render(
        <ComponentWithDeclarativeEvent
          ref={(current) => {
            root = current;
          }}
        />
      );
      let wc = root.wc;
      let handled = root.camel;
      expect(handled.textContent).to.eql("false");
      act(() => {
        wc.click();
      });
      expect(handled.textContent).to.eql("true");
    });

    it("can declaratively listen to a CAPScase DOM event dispatched by a Custom Element", function() {
      this.weight = 1;
      let root;
      render(
        <ComponentWithDeclarativeEvent
          ref={(current) => {
            root = current;
          }}
        />
      );
      let wc = root.wc;
      let handled = root.caps;
      expect(handled.textContent).to.eql("false");
      act(() => {
        wc.click();
      });
      expect(handled.textContent).to.eql("true");
    });

    it("can declaratively listen to a PascalCase DOM event dispatched by a Custom Element", function() {
      this.weight = 1;
      let root;
      render(
        <ComponentWithDeclarativeEvent
          ref={(current) => {
            root = current;
          }}
        />
      );
      let wc = root.wc;
      let handled = root.pascal;
      expect(handled.textContent).to.eql("false");
      act(() => {
        wc.click();
      });
      expect(handled.textContent).to.eql("true");
    });
  });

});
