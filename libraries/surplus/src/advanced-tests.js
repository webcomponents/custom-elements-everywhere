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

import S from 's-js';
import * as Surplus from "surplus";
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

describe("advanced support", function() {

  describe("attributes and properties", function() {
    it("will pass array data as a property", function() {
      this.weight = 2;
      S.root(() => {
        let root = <ComponentWithProperties />;
        let wc = root.wc;
        let data = wc.arr;
        expect(data).to.eql(["S", "u", "r", "p", "l", "u", "s"]);
      });
    });

    it("will pass object data as a property", function() {
      this.weight = 2;
      S.root(() => {
        let root = <ComponentWithProperties />;
        let wc = root.wc;
        let data = wc.obj;
        expect(data).to.eql({ org: "adam.haile@gmail.com", repo: "surplus" });
      });
    });
  });

  describe("events", function() {
    it("can declaratively listen to a lowercase DOM event dispatched by a Custom Element", function() {
      this.weight = 2;
      S.root(() => {
        let root = <ComponentWithDeclarativeEvent />;
        let wc = root.wc;
        let handled = root.lowercase;
        expect(handled.textContent).to.eql("false");
        wc.click();
        expect(handled.textContent).to.eql("true");
      });
    });

    it("can declaratively listen to a kebab-case DOM event dispatched by a Custom Element", function() {
      this.weight = 1;
      S.root(() => {
        let root = <ComponentWithDeclarativeEvent />;
        let wc = root.wc;
        let handled = root.kebab;
        expect(handled.textContent).to.eql("false");
        wc.click();
        expect(handled.textContent).to.eql("true");
      });
    });

    it("can declaratively listen to a camelCase DOM event dispatched by a Custom Element", function() {
      this.weight = 1;
      S.root(() => {
        let root = <ComponentWithDeclarativeEvent />;
        let wc = root.wc;
        let handled = root.camel;
        expect(handled.textContent).to.eql("false");
        wc.click();
        expect(handled.textContent).to.eql("true");
      });
    });

    it("can declaratively listen to a CAPScase DOM event dispatched by a Custom Element", function() {
      this.weight = 1;
      S.root(() => {
        let root = <ComponentWithDeclarativeEvent />;
        let wc = root.wc;
        let handled = root.caps;
        expect(handled.textContent).to.eql("false");
        wc.click();
        expect(handled.textContent).to.eql("true");
      });
    });

    it("can declaratively listen to a PascalCase DOM event dispatched by a Custom Element", function() {
      this.weight = 1;
      S.root(async () => {
        let root = <ComponentWithDeclarativeEvent />;
        let wc = root.wc;
        let handled = root.pascal;
        expect(handled.textContent).to.eql("false");
        wc.click();
        expect(handled.textContent).to.eql("true");
      });
    });
  });

});
