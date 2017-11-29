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

import DefineMap from "can-define/map/map";
import stache from "can-stache";
import canViewModel from "can-view-model";
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
let root; // This will hold the actual element under test.

beforeEach(function() {
  root = document.createElement("div");
  app.appendChild(root);
});

afterEach(function() {
  app.innerHTML = "";
  root = null;
});

describe("basic support", function() {

  describe("no children", function() {
    it("can display a Custom Element with no children", function() {
      this.weight = 3;
      root.appendChild(stache(`<${ComponentWithoutChildren} />`)());
      let wc = root.querySelector("#wc");
      expect(wc).toExist();
    });
  });

  describe("with children", function() {
    function expectHasChildren(wc) {
      expect(wc).toExist();
      let shadowRoot = wc.shadowRoot;
      let heading = shadowRoot.querySelector("h1");
      expect(heading).toExist();
      expect(heading.textContent).toEqual("Test h1");
      let paragraph = shadowRoot.querySelector("p");
      expect(paragraph).toExist();
      expect(paragraph.textContent).toEqual("Test p");
    }

    it("can display a Custom Element with children in a Shadow Root", function() {
      this.weight = 3;
      root.appendChild(stache(`<${ComponentWithChildren} />`)());
      let wc = root.querySelector("#wc");
      expectHasChildren(wc);
    });

    it("can display a Custom Element with children in a Shadow Root and pass in Light DOM children", async function() {
      this.weight = 3;
      root.appendChild(stache(`<${ComponentWithChildrenRerender} />`)());
      let wc = root.querySelector("#wc");
      await Promise.resolve();
      expectHasChildren(wc);
      expect(wc.textContent.includes("2")).toEqual(true);
    });

    it("can display a Custom Element with children in the Shadow DOM and handle hiding and showing the element", function(done) {
      this.weight = 3;
      root.appendChild(stache(`<${ComponentWithDifferentViews} />`)());
      let viewModel = canViewModel(
        root.querySelector(ComponentWithDifferentViews)
      );
      let wc = root.querySelector("#wc");
      expectHasChildren(wc);
      viewModel.toggle();
      let dummy = root.querySelector("#dummy");
      expect(dummy).toExist();
      expect(dummy.textContent).toEqual("Dummy view");
      viewModel.toggle();
      wc = root.querySelector("#wc");
      expectHasChildren(wc);
      done();
    });
  });

  describe("attributes and properties", function() {
    it("will pass boolean data as either an attribute or a property", function() {
      this.weight = 3;
      root.appendChild(stache(`<${ComponentWithProperties} />`)());
      let wc = root.querySelector("#wc");
      let data = wc.bool || wc.hasAttribute("bool");
      expect(data).toBe(true);
    });

    it("will pass numeric data as either an attribute or a property", function() {
      this.weight = 3;
      root.appendChild(stache(`<${ComponentWithProperties} />`)());
      let wc = root.querySelector("#wc");
      let data = wc.num || wc.getAttribute("num");
      expect(data).toEqual(42);
    });

    it("will pass string data as either an attribute or a property", function() {
      this.weight = 3;
      root.appendChild(stache(`<${ComponentWithProperties} />`)());
      let wc = root.querySelector("#wc");
      let data = wc.str || wc.getAttribute("str");
      expect(data).toEqual("CanJS");
    });

    it("will pass array data as a property", function() {
      this.weight = 2;
      root.appendChild(stache(`<${ComponentWithProperties} />`)());
      let wc = root.querySelector("#wc");
      let data = wc.arr;
      expect(data).toEqual(["C", "a", "n", "j", "s"]);
    });

    it("will pass object data as a property", function() {
      this.weight = 2;
      root.appendChild(stache(`<${ComponentWithProperties} />`)());
      let wc = root.querySelector("#wc");
      let data = wc.obj;
      expect(data).toEqual({ org: "canjs", repo: "CanJS" });
    });

    // it('will set boolean attributes on a Custom Element that has not already been defined and upgraded', function() {
    //   root.appendChild(stache(`<${ComponentWithUnregistered} />`)());
    //   let wc = root.querySelector('#wc');
    //   expect(wc.hasAttribute('bool')).toBe(true);
    // });

    // it('will set numeric attributes on a Custom Element that has not already been defined and upgraded', function() {
    //   root.appendChild(stache(`<${ComponentWithUnregistered} />`)());
    //   let wc = root.querySelector('#wc');
    //   expect(wc.getAttribute('num')).toEqual('42');
    // });

    // it('will set string attributes on a Custom Element that has not already been defined and upgraded', function() {
    //   root.appendChild(stache(`<${ComponentWithUnregistered} />`)());
    //   let wc = root.querySelector('#wc');
    //   expect(wc.getAttribute('str')).toEqual('CanJS');
    // });

    // it('will set array properties on a Custom Element that has not already been defined and upgraded', function() {
    //   let root = render(<ComponentWithUnregistered />, scratch);
    //   let wc = root.querySelector('#wc');
    //   expect(wc.arr).toEqual(['C', 'a', 'n', 'j', 's']);
    // });

    // it('will set object properties on a Custom Element that has not already been defined and upgraded', function() {
    //   let root = render(<ComponentWithUnregistered />, scratch);
    //   let wc = root.querySelector('#wc');
    //   expect(wc.obj).toEqual({ org: 'canjs', repo: 'CanJS' });
    // });
  });

  describe("events", function() {
    it("can imperatively listen to a DOM event dispatched by a Custom Element", async function() {
      this.weight = 3;
      root.appendChild(stache(`<${ComponentWithImperativeEvent} />`)());
      await Promise.resolve();
      let wc = root.querySelector("#wc");
      expect(wc).toExist();
      let handled = root.querySelector("#handled");
      expect(handled.textContent).toEqual("false");
      wc.click();
      expect(handled.textContent).toEqual("true");
    });
  });

});
