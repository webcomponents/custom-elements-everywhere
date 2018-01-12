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

import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
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

beforeEach(function() {
  TestBed.configureTestingModule({
    declarations: [
      ComponentWithoutChildren,
      ComponentWithChildren,
      ComponentWithChildrenRerender,
      ComponentWithDifferentViews,
      ComponentWithProperties,
      ComponentWithUnregistered,
      ComponentWithImperativeEvent,
      ComponentWithDeclarativeEvent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  });
});

describe("advanced support", function() {

  describe("attributes and properties", function() {
    it("will pass array data as a property", function() {
      this.weight = 2;
      let fixture = TestBed.createComponent(ComponentWithProperties);
      fixture.detectChanges();
      let root = fixture.debugElement.nativeElement;
      let wc = root.querySelector("#wc");
      let data = wc.arr;
      expect(data).to.eql(["A", "n", "g", "u", "l", "a", "r"]);
    });

    it("will pass object data as a property", function() {
      this.weight = 2;
      let fixture = TestBed.createComponent(ComponentWithProperties);
      fixture.detectChanges();
      let root = fixture.debugElement.nativeElement;
      let wc = root.querySelector("#wc");
      let data = wc.obj;
      expect(data).to.eql({ org: "angular", repo: "angular" });
    });
  });

  describe("events", function() {
    it("can declaratively listen to a lowercase DOM event dispatched by a Custom Element", function() {
      this.weight = 2;
      let fixture = TestBed.createComponent(ComponentWithDeclarativeEvent);
      fixture.detectChanges();
      let root = fixture.debugElement.nativeElement;
      let wc = root.querySelector("#wc");
      let handled = root.querySelector("#lowercase");
      expect(handled.textContent).to.eql("false");
      wc.click();
      fixture.detectChanges();
      expect(handled.textContent).to.eql("true");
    });

    it("can declaratively listen to a kebab-case DOM event dispatched by a Custom Element", function() {
      this.weight = 1;
      let fixture = TestBed.createComponent(ComponentWithDeclarativeEvent);
      fixture.detectChanges();
      let root = fixture.debugElement.nativeElement;
      let wc = root.querySelector("#wc");
      let handled = root.querySelector("#kebab");
      expect(handled.textContent).to.eql("false");
      wc.click();
      fixture.detectChanges();
      expect(handled.textContent).to.eql("true");
    });

    it("can declaratively listen to a camelCase DOM event dispatched by a Custom Element", function() {
      this.weight = 1;
      let fixture = TestBed.createComponent(ComponentWithDeclarativeEvent);
      fixture.detectChanges();
      let root = fixture.debugElement.nativeElement;
      let wc = root.querySelector("#wc");
      let handled = root.querySelector("#camel");
      expect(handled.textContent).to.eql("false");
      wc.click();
      fixture.detectChanges();
      expect(handled.textContent).to.eql("true");
    });

    it("can declaratively listen to a CAPScase DOM event dispatched by a Custom Element", function() {
      this.weight = 1;
      let fixture = TestBed.createComponent(ComponentWithDeclarativeEvent);
      fixture.detectChanges();
      let root = fixture.debugElement.nativeElement;
      let wc = root.querySelector("#wc");
      let handled = root.querySelector("#caps");
      expect(handled.textContent).to.eql("false");
      wc.click();
      fixture.detectChanges();
      expect(handled.textContent).to.eql("true");
    });

    it("can declaratively listen to a PascalCase DOM event dispatched by a Custom Element", function() {
      this.weight = 1;
      let fixture = TestBed.createComponent(ComponentWithDeclarativeEvent);
      fixture.detectChanges();
      let root = fixture.debugElement.nativeElement;
      let wc = root.querySelector("#wc");
      let handled = root.querySelector("#pascal");
      expect(handled.textContent).to.eql("false");
      wc.click();
      fixture.detectChanges();
      expect(handled.textContent).to.eql("true");
    });
  });

});
