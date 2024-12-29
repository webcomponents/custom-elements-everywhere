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

import {createApp, nextTick} from 'vue';
import {ComponentWithDeclarativeEvent, ComponentWithProperties} from "./components";
import tests from 'advanced-tests';

const isCustomElement = (tagName) => {
  return window.customElements.get(tagName) !== undefined;
}

// Setup the test harness. This will get cleaned out with every test.
const container = document.createElement("div");
document.body.appendChild(container);
let scratch; // This will hold the actual element under test.

beforeEach(function() {
  scratch = document.createElement("div");
  scratch.id = "scratch";
  container.appendChild(scratch);
});

afterEach(function() {
  container.innerHTML = "";
  scratch = null;
});


function render(Component) {
  const app = createApp(Component)
  app.config.compilerOptions.isCustomElement = isCustomElement;
  app.mount(scratch);
  const wc = scratch.querySelector("#wc");
  return {wc}
}

tests({
   renderComponentWithProperties() {
    return render(ComponentWithProperties);
  },
  renderComponentWithDeclarativeEvent() {
    const { wc } = render(ComponentWithDeclarativeEvent);
    async function click() {
      wc.click();
      await nextTick();
    }
    return { wc, click }
  }
});
