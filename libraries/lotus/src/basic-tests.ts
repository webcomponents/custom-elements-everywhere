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
  // ComponentWithProperties,
  // ComponentWithImperativeEvent
} from "./components";



beforeEach(function() {

});

afterEach(function() {

});

describe("basic support", function() {

  describe("no children", function() {
    it("can display a Custom Element with no children", async function() {
      this.weight = 3;
      const element = await ComponentWithoutChildren();
      const wc = element.shadowRoot?.querySelector("ce-without-children");
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

    it("can display a Custom Element with children in a Shadow Root", async function() {
      this.weight = 3;
      // document.querySelector('lotus-component-with-children').shadowRoot.querySelector('ce-with-children')
      const element = await ComponentWithChildren();
      const wc = element.shadowRoot?.querySelector('ce-with-children');
      expectHasChildren(wc);
    });

    it("can display a Custom Element with children in a Shadow Root and pass in Light DOM children", async function() {
      this.weight = 3;
      const element = await ComponentWithChildrenRerender();
      const wc = element.shadowRoot?.querySelector('ce-with-children') as HTMLDivElement;
      expect(wc.innerHTML).to.eq('1');
      expectHasChildren(wc);
      (element.shadowRoot?.querySelector("ce-with-children") as HTMLElement).innerHTML = '2';
      expect(wc.innerHTML).to.eq('2');
      expectHasChildren(wc);
    });

    it("can display a Custom Element with children in the Shadow DOM and handle hiding and showing the element", async function() {
      this.weight = 3;
      const element = await ComponentWithDifferentViews();
      const wc = element.shadowRoot?.querySelector('ce-with-children') as HTMLDivElement;
      expectHasChildren(wc);
      // @ts-ignore
      const toggle = element.component.skinPartMap.get('button');
      // @ts-ignore
      const dummy = element.component.skinPartMap.get('dummy');
      expect(dummy.style.display).to.eq('none');
      expect(wc.style.display).to.eq('block');
      toggle.click();
      expect(dummy.style.display).to.eq('block');
      expect(wc.style.display).to.eq('none');
      toggle.click();
      expect(dummy.style.display).to.eq('none');
      expect(wc.style.display).to.eq('block');
    });
  });

  xdescribe("attributes and properties", function() {
    xit("will pass boolean data as either an attribute or a property", async function() {
      this.weight = 3;
      // TODO
      const wc = document.querySelector("ce-with-properties");
      expect((wc as any).bool).to.be.true;
    });

    xit("will pass numeric data as either an attribute or a property", async function() {
      this.weight = 3;
      // TODO
      const wc = document.querySelector("ce-with-properties");
      expect((wc as any).num).to.eql(42);
    });

    xit("will pass string data as either an attribute or a property", async function() {
      this.weight = 3;
      // TODO
      const wc: any = document.querySelector("ce-with-properties");
      const data = wc.getAttribute("str");
      expect(data).to.eql("Dojo");
    });
  });

  xdescribe("events", function() {
    xit("can imperatively listen to a DOM event dispatched by a Custom Element", async function() {
      this.weight = 3;
      // TODO
      const wc: any = document.querySelector("ce-with-event");
      let handledResult: any = document.querySelector("#eventHandled");
      expect(handledResult.handled).to.be.false;
      wc.click();
      expect(handledResult.handled).to.be.true;
    });
  });

});
