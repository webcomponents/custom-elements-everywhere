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

import { ProjectorMixin } from "@dojo/widget-core/mixins/Projector";

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

describe("basic support", function() {

  describe("no children", function() {
    it("can display a Custom Element with no children", function() {
      this.weight = 3;
      const Component = ProjectorMixin(ComponentWithoutChildren);
      const component = new Component();
      component.append(scratch);
      const wc = document.querySelector("ce-without-children");
      expect(wc).to.exist;
    });
  });

  describe("with children", function() {
    function expectHasChildren(wc: any) {
      let shadowRoot = wc.shadowRoot;
      let heading = shadowRoot.querySelector("h1");
      expect(heading).to.exist;
      expect(heading.textContent).to.eql("Test h1");
      let paragraph = shadowRoot.querySelector("p");
      expect(paragraph).to.exist;
      expect(paragraph.textContent).to.eql("Test p");
    }

    it("can display a Custom Element with children in a Shadow Root", function() {
      this.weight = 3;
      const Component = ProjectorMixin(ComponentWithChildren);
      const component = new Component();
      component.append(scratch);
      const wc = document.querySelector("ce-with-children");
      expectHasChildren(wc);
    });

    it("can display a Custom Element with children in a Shadow Root and pass in Light DOM children", function() {
      this.weight = 3;
      const Component = ProjectorMixin(ComponentWithChildrenRerender);
      const component = new Component();
      component.append(scratch);
      const wc = document.querySelector("ce-with-children");
      expectHasChildren(wc);
    });

    it("can display a Custom Element with children in the Shadow DOM and handle hiding and showing the element", function() {
      this.weight = 3;
      const Component = ProjectorMixin(ComponentWithDifferentViews);
      const component = new Component();
      component.append(scratch);
      const wc = document.querySelector("ce-with-children");
      expectHasChildren(wc);
    });
  });

  describe("attributes and properties", function() {
    it("will pass boolean data as either an attribute or a property", function() {
      this.weight = 3;
      const Component = ProjectorMixin(ComponentWithProperties);
      const component = new Component();
      component.append(scratch);
      const wc = document.querySelector("ce-with-properties");
      expect((wc as any).bool).to.be.true;
    });

    it("will pass numeric data as either an attribute or a property", function() {
      this.weight = 3;
      const Component = ProjectorMixin(ComponentWithProperties);
      const component = new Component();
      component.append(scratch);
      const wc = document.querySelector("ce-with-properties");
      expect((wc as any).num).to.eql(42);
    });

    it("will pass string data as either an attribute or a property", function() {
      this.weight = 3;
      const Component = ProjectorMixin(ComponentWithProperties);
      const component = new Component();
      component.append(scratch);
      const wc: any = document.querySelector("ce-with-properties");
      const data = wc.getAttribute("str");
      expect(data).to.eql("Dojo2");
    });
  });

  describe("events", function() {
    it("can imperatively listen to a DOM event dispatched by a Custom Element", function() {
      this.weight = 3;
      const Component = ProjectorMixin(ComponentWithImperativeEvent);
      const component = new Component();
      component.async = false;
      component.append(scratch);
      const wc: any = document.querySelector("ce-with-event");
      expect(component.eventHandled).to.be.false;
      wc.click();
      expect(component.eventHandled).to.be.true;
    });
  });

});
