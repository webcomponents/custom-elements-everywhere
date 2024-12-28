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

import tests from 'advanced-tests';

function render(Component) {
  const fixture = TestBed.createComponent(Component);
  fixture.detectChanges();
  const el = fixture.debugElement.nativeElement;
  const wc = el.querySelector('#wc');
  return { wc, fixture }
}

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

tests({
  renderComponentWithProperties() {
    return render(ComponentWithProperties);
  },
  renderComponentWithDeclarativeEvent() {
    const { wc, fixture } = render(ComponentWithDeclarativeEvent);
    function click() {
      wc.click();
      fixture.detectChanges();
    }
    return { wc, fixture, click };
  }
});
