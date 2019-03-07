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

import renderer from "@dojo/framework/widget-core/vdom";
import { w } from "@dojo/framework/widget-core/d";

// Setup the test harness. This will get cleaned out with every test.
let app = document.createElement("div");
app.id = "app";
document.body.appendChild(app);
let scratch: any; // This will hold the actual element under test.

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
      const r = renderer(() => w(ComponentWithProperties, {}));
      r.mount({ domNode: scratch, sync: true });
      const wc: any = document.querySelector("ce-with-properties");
      const data = wc.arr;
      expect(data).to.eql(["d", "o", "j", "o"]);
    });

    it("will pass object data as a property", function() {
      this.weight = 2;
      const r = renderer(() => w(ComponentWithProperties, {}));
      r.mount({ domNode: scratch, sync: true });
      const wc: any = document.querySelector("ce-with-properties");
      const data = wc.obj;
      expect(data).to.eql({ org: "dojo", repo: "dojo" });
    });
  });

  describe("events", function() {
    it("can declaratively listen to a lowercase DOM event dispatched by a Custom Element", function() {
      this.weight = 2;
      const r = renderer(() => w(ComponentWithDeclarativeEvent, {}));
      r.mount({ domNode: scratch, sync: true });
      const wc: any = document.querySelector("ce-with-event");
      let handledResult: any = document.querySelector("#lower");
      expect(handledResult.handled).to.be.false;
      wc.click();
      expect(handledResult.handled).to.be.true;
    });

    it("can declaratively listen to a kebab-case DOM event dispatched by a Custom Element", function() {
      this.weight = 1;
      const r = renderer(() => w(ComponentWithDeclarativeEvent, {}));
      r.mount({ domNode: scratch, sync: true });
      const wc: any = document.querySelector("ce-with-event");
      let handledResult: any = document.querySelector("#kebab");
      expect(handledResult.handled).to.be.false;
      wc.click();
      expect(handledResult.handled).to.be.true;
    });

    it("can declaratively listen to a camelCase DOM event dispatched by a Custom Element", function() {
      this.weight = 1;
      const r = renderer(() => w(ComponentWithDeclarativeEvent, {}));
      r.mount({ domNode: scratch, sync: true });
      const wc: any = document.querySelector("ce-with-event");
      let handledResult: any = document.querySelector("#camel");
      expect(handledResult.handled).to.be.false;
      wc.click();
      expect(handledResult.handled).to.be.true;
    });

    it("can declaratively listen to a CAPScase DOM event dispatched by a Custom Element", function() {
      this.weight = 1;
      const r = renderer(() => w(ComponentWithDeclarativeEvent, {}));
      r.mount({ domNode: scratch, sync: true });
      const wc: any = document.querySelector("ce-with-event");
      let handledResult: any = document.querySelector("#caps");
      expect(handledResult.handled).to.be.false;
      wc.click();
      expect(handledResult.handled).to.be.true;
    });

    it("can declaratively listen to a PascalCase DOM event dispatched by a Custom Element", function() {
      this.weight = 1;
      const r = renderer(() => w(ComponentWithDeclarativeEvent, {}));
      r.mount({ domNode: scratch, sync: true });
      const wc: any = document.querySelector("ce-with-event");
      let handledResult: any = document.querySelector("#pascal");
      expect(handledResult.handled).to.be.false;
      wc.click();
      expect(handledResult.handled).to.be.true;
    });
  });

});
