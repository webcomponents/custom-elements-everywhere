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
import { define } from "hybrids";

import {
  ComponentWithProperties,
  ComponentWithDeclarativeEvent,
} from "./components";

describe("advanced support", function() {
  // Setup the test harness. This will get cleaned out with every test.
  const app = document.createElement("div");
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

  describe("attributes and properties", function() {
    define("component-with-properties", ComponentWithProperties);

    beforeEach(() => {
      root.appendChild(document.createElement("component-with-properties"));
    })

    it("will pass array data as a property", function(done) {
      this.weight = 2;
      requestAnimationFrame(() => {
        const wc = root.firstElementChild.shadowRoot.querySelector('#wc');
        const data = wc.arr || wc.getAttribute("arr");
        expect(data).to.eql(["h", "y", "b", "r", "i", "d", "s"]);
        done();
      });
    });

    it("will pass object data as a property", function(done) {
      this.weight = 2;
      requestAnimationFrame(() => {
        const wc = root.firstElementChild.shadowRoot.querySelector('#wc');
        const data = wc.obj || wc.getAttribute("obj");
        expect(data).to.eql({ library: "hybrids" });
        done();
      });
    });
  });

  describe("events", function() {
    define("component-with-declarative-event", ComponentWithDeclarativeEvent);

    let ce;
    beforeEach(() => {
      ce = root.appendChild(document.createElement("component-with-declarative-event"));
    });

    it('can declaratively listen to a lowercase DOM event dispatched by a Custom Element', function(done) {
      this.weight = 2;
      requestAnimationFrame(() => {
        const wc = ce.shadowRoot.querySelector("#wc");
        expect(wc).to.exist;
        expect(ce.lowercaseHandled).to.eql(false);
        wc.click();
        expect(ce.lowercaseHandled).to.eql(true);
        done();
      });
    });

    it("can declaratively listen to a kebab-case DOM event dispatched by a Custom Element", function(done) {
      this.weight = 1;
      requestAnimationFrame(() => {
        const wc = ce.shadowRoot.querySelector("#wc");
        expect(wc).to.exist;
        expect(ce.kebabHandled).to.eql(false);
        wc.click();
        expect(ce.kebabHandled).to.eql(true);
        done();
      });
    });

    it("can declaratively listen to a camelCase DOM event dispatched by a Custom Element", function(done) {
      this.weight = 1;
      requestAnimationFrame(() => {
        const wc = ce.shadowRoot.querySelector("#wc");
        expect(wc).to.exist;
        expect(ce.camelHandled).to.eql(false);
        wc.click();
        expect(ce.camelHandled).to.eql(true);
        done();
      });
    });

    it("can declaratively listen to a CAPScase DOM event dispatched by a Custom Element", function(done) {
      this.weight = 1;
      requestAnimationFrame(() => {
        const wc = ce.shadowRoot.querySelector("#wc");
        expect(wc).to.exist;
        expect(ce.capsHandled).to.eql(false);
        wc.click();
        expect(ce.capsHandled).to.eql(true);
        done();
      });
    });

    it("can declaratively listen to a PascalCase DOM event dispatched by a Custom Element", function(done) {
      this.weight = 1;
      requestAnimationFrame(() => {
        const wc = ce.shadowRoot.querySelector("#wc");
        expect(wc).to.exist;
        expect(ce.pascalHandled).to.eql(false);
        wc.click();
        expect(ce.pascalHandled).to.eql(true);
        done();
      });
    });
  });
});
