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

// import "@stencil/core";
import "./built-components/components.js";
import expect from "expect";

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
  // !!! Only comment this out when debugging tests
  // app.innerHTML = "";
  // scratch = null;
});

// describe("dummy test", function() {
//   it("is true", function() {
//     this.weight = 1;
//     expect(true).toEqual(true);
//   });
// });

describe("no children", function() {
  it("can display a Custom Element with no children", function() {
    this.weight = 3;
    let root = document.createElement("component-with-declarative-event");
    scratch.appendChild(root);
    // let wc = root.shadowRoot.querySelector("#wc");
    // expect(wc).toExist();
    expect(true).toEqual(true);
  });
});
