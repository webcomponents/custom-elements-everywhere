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

import {h, render} from "dio.js";
import {ComponentWithDeclarativeEvent, ComponentWithProperties} from "./components";

import tests from 'advanced-tests';

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

function _render(Component) {
  let component
  render(<Component ref={(instance) => component = instance} />, scratch), scratch;
  const wc = scratch.querySelector("#wc");
  return { wc, component }
}

tests({
 renderComponentWithProperties() {
    return _render(ComponentWithProperties);
  },
  renderComponentWithDeclarativeEvent() {
    const { wc, component } = _render(ComponentWithDeclarativeEvent);
    function click() {
      wc.click();
      component.forceUpdate();
    }
    return { wc, click };
  }
})