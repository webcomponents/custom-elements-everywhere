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

import {createSignal, Show} from "solid-js";
import {createStore} from "solid-js/store";
import "wc/ce-without-children";
import "wc/ce-with-children";
import "wc/ce-with-properties";
import "wc/ce-with-event";

export const ComponentWithoutChildren = () => <ce-without-children id="ce-without-children"/>;

export const ComponentWithChildren = () => <ce-with-children id="ce-with-children"/>;

export const ComponentWithChildrenRerender = () => {
  const [count, setCount] = createSignal(1);
  Promise.resolve().then(() => setCount(count() + 1));
  return <ce-with-children id="ce-with-children-rerender">{count}</ce-with-children>;
};

export const ComponentWithDifferentViews = () => {
  const [show, setShow] = createSignal(true);
  return (
    <div id="ce-with-different-views">
      <button onClick={() => setShow(!show())}>Toggle views</button>
      <Show when={show()} fallback={<div>Dummy view</div>}>
        <ce-with-children/>
      </Show>
    </div>
  );
};

export const ComponentWithProperties = () => {
  const data = {
    bool: true,
    num: 42,
    str: 'custom',
    arr: ['c', 'u', 's', 't', 'o', 'm'],
    obj: {org: 'webcomponents', repo: 'custom-elements-everywhere'},
    camelCaseObj: {label: "passed"},
  };
  return (
    <ce-with-properties
      id="ce-with-properties"
      bool={data.bool}
      num={data.num}
      str={data.str}
      arr={data.arr}
      obj={data.obj}
      prop:camelCaseObj={data.camelCaseObj} // verbatim prop syntax, otherwise defaults to dash-case-to-camel-case
    />
  );
};

export const ComponentWithUnregistered = () => {
  const data = {
    bool: true,
    num: 42,
    str: "Solid",
    arr: ["S", "o", "l", "i", "d"],
    obj: {org: "ryansolid", repo: "solid"},
  };
  return (
    <ce-unregistered
      id="ce-with-unregistered"
      bool={data.bool}
      num={data.num}
      str={data.str}
      arr={data.arr}
      obj={data.obj}
    />
  );
};

export const ComponentWithImperativeEvent = () => {
  const [eventHandled, setHandled] = createSignal(false),
    handleTestEvent = () => setHandled(true),
    handleCamel = (wc) => wc.addEventListener("camelEvent", handleTestEvent);
  return (
    <>
      <div id="ce-with-imperative-event-handled">{eventHandled().toString()}</div>
      <ce-with-event id="ce-with-imperative-event" ref={handleCamel}>Imperative</ce-with-event>
    </>
  );
};

export const ComponentWithDeclarativeEvent = () => {
  const [state, setState] = createStore({
      lowercaseHandled: false,
      kebabHandled: false,
      camelHandled: false,
      capsHandled: false,
      pascalHandled: false,
    }),
    handleLowercaseEvent = () => setState("lowercaseHandled", true),
    handleKebabEvent = () => setState("kebabHandled", true),
    handleCamelEvent = () => setState("camelHandled", true),
    handleCapsEvent = () => setState("capsHandled", true),
    handlePascalEvent = () => setState("pascalHandled", true);

  return (
    <>
      <div>lowercase: {state.lowercaseHandled.toString()}</div>
      <div>kebab-case: {state.kebabHandled.toString()}</div>
      <div>camelCase: {state.camelHandled.toString()}</div>
      <div>CAPScase: {state.capsHandled.toString()}</div>
      <div>PascalCase: {state.pascalHandled.toString()}</div>
      <ce-with-event
        id="ce-with-declarative-event"
        on:lowercaseevent={handleLowercaseEvent}
        on:kebab-event={handleKebabEvent}
        on:camelEvent={handleCamelEvent}
        on:CAPSevent={handleCapsEvent}
        on:PascalEvent={handlePascalEvent}
      >Declarative</ce-with-event>
    </>
  );
};
