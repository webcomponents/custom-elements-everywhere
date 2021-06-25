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

import "ce-without-children";
import "ce-with-children";
import "ce-with-properties";
import "ce-with-event";

import h3 from "@h3rald/h3";

export const ComponentWithoutChildren = () =>
  h3("div", h3("ce-without-children#wc"));

export const ComponentWithChildren = () =>
  h3("div", h3("ce-with-children#wc", []));

let count = 1;
export const ComponentWithChildrenRerender = () => {
  return h3(
    "div",
    {
      $onrender: (node) => {
        count++;
        h3.redraw();
      },
    },
    h3("ce-with-children#wc", String(count))
  );
};

let showWC = true;
export const ComponentWithDifferentViews = () => {
  return h3(
    "div#ce",
    {
      $onrender: (node) => {
        node.toggle = () => {
          showWC = !showWC;
          h3.redraw();
        };
      },
      showWC: showWC,
    },
    showWC ? h3("ce-with-children#wc") : h3("#dummy", "Dummy view")
  );
};

export const ComponentWithProperties = () =>
  h3(
    "div",
    h3("ce-with-properties#wc", {
      bool: true,
      num: 42,
      str: "H3",
      arr: ["H", "3"],
      obj: { org: "h3rald", repo: "h3" },
    })
  );

let eventHandled = false;
export const ComponentWithImperativeEvent = () => {
  return h3("div", [
    h3("div#handled", String(eventHandled)),
    h3("ce-with-event#wc", {
      $onrender: (node) => {
        node.addEventListener("camelEvent", (e) => {
          eventHandled = true;
          h3.redraw();
        });
      },
    }),
  ]);
};

export const eventResults = {
  lowercaseHandled: false,
  kebabHandled: false,
  camelHandled: false,
  capsHandled: false,
  pascalHandled: false,
}

export const ComponentWithDeclarativeEvent = () => {
  return h3("div", [
    h3("div#lowercase", String(eventResults.lowercaseHandled)),
    h3("div#kebab", String(eventResults.kebabHandled)),
    h3("div#camel", String(eventResults.camelHandled)),
    h3("div#caps", String(eventResults.capsHandled)),
    h3("div#pascal", String(eventResults.pascalHandled)),
    h3("ce-with-event#wc", {
      onlowercaseevent: (e) => {
        eventResults.lowercaseHandled = true;
        h3.redraw();
      },
      "onkebab-event": (e) => {
        eventResults.kebabHandled = true;
        h3.redraw();
      },
      oncamelEvent: (e) => {
        eventResults.camelHandled = true;
        h3.redraw();
      },
      onCAPSevent: (e) => {
        eventResults.capsHandled = true;
        h3.redraw();
      },
      onPascalEvent: (e) => {
        eventResults.pascalHandled = true;
        h3.redraw();
      },
    }),
  ]);
};
