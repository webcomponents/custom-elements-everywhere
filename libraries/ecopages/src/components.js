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

import {
  createRoot,
  createSubscribableJsxValue,
} from "@ecopages/jsx/client";
import "ce-without-children";
import "ce-with-children";
import "ce-with-properties";
import "ce-with-event";

function createBooleanDisplay(initial = false) {
  let value = initial;
  const listeners = new Set();
  const sub = createSubscribableJsxValue({
    getValue: () => value.toString(),
    subscribe: (notify) => {
      listeners.add(notify);
      notify(value.toString());
      return () => listeners.delete(notify);
    },
  });
  return {
    sub,
    setTrue: () => {
      if (value) {
        return;
      }
      value = true;
      const next = value.toString();
      listeners.forEach((notify) => notify(next));
    },
  };
}

function createNumberDisplay(initial) {
  let value = initial;
  const listeners = new Set();
  const sub = createSubscribableJsxValue({
    getValue: () => value,
    subscribe: (notify) => {
      listeners.add(notify);
      notify(value);
      return () => listeners.delete(notify);
    },
  });
  return {
    sub,
    increment: () => {
      value += 1;
      listeners.forEach((notify) => notify(value));
    },
  };
}

export const ComponentWithoutChildren = () => <ce-without-children />;

export const ComponentWithChildren = () => <ce-with-children />;

export const ComponentWithChildrenRerender = () => {
  const count = createNumberDisplay(1);
  Promise.resolve().then(() => count.increment());
  return <ce-with-children>{count.sub}</ce-with-children>;
};

export function mountComponentWithDifferentViews(container) {
  const root = createRoot(container);
  let show = true;
  const paint = () => {
    root.render(
      show ? (
        <ce-with-children id="wc" />
      ) : (
        <div id="dummy">Dummy view</div>
      )
    );
  };
  paint();
  return () => {
    show = !show;
    paint();
  };
}

export const ComponentWithProperties = () => {
  const data = {
    bool: true,
    num: 42,
    str: "Ecopages",
    arr: ["E", "c", "o", "p", "a", "g", "e", "s"],
    obj: { org: "ecopages", repo: "ecopages" },
    camelCaseObj: { label: "passed" },
  };
  return (
    <ce-with-properties
      bool={data.bool}
      num={data.num}
      str={data.str}
      arr={data.arr}
      obj={data.obj}
      prop:camelCaseObj={data.camelCaseObj}
    />
  );
};

export const ComponentWithUnregistered = () => {
  const data = {
    bool: true,
    num: 42,
    str: "Ecopages",
    arr: ["E", "c", "o", "p", "a", "g", "e", "s"],
    obj: { org: "ecopages", repo: "ecopages" },
  };
  return (
    <ce-unregistered
      bool={data.bool}
      num={data.num}
      str={data.str}
      arr={data.arr}
      obj={data.obj}
    />
  );
};

export const ComponentWithImperativeEvent = ({ container }) => {
  const handled = createBooleanDisplay(false);
  const handleTestEvent = () => handled.setTrue();
  queueMicrotask(() => {
    const wc = container?.querySelector("#wc");
    if (wc) {
      wc.addEventListener("camelEvent", handleTestEvent);
    }
  });
  return (
    <>
      <div id="handled">{handled.sub}</div>
      <ce-with-event id="wc" />
    </>
  );
};

export const ComponentWithDeclarativeEvent = () => {
  const lowercaseHandled = createBooleanDisplay(false);
  const kebabHandled = createBooleanDisplay(false);
  const camelHandled = createBooleanDisplay(false);
  const capsHandled = createBooleanDisplay(false);
  const pascalHandled = createBooleanDisplay(false);

  return (
    <>
      <div id="lowercase">{lowercaseHandled.sub}</div>
      <div id="kebab">{kebabHandled.sub}</div>
      <div id="camel">{camelHandled.sub}</div>
      <div id="caps">{capsHandled.sub}</div>
      <div id="pascal">{pascalHandled.sub}</div>
      <ce-with-event
        id="wc"
        on:lowercaseevent={() => lowercaseHandled.setTrue()}
        on:kebab-event={() => kebabHandled.setTrue()}
        on:camelEvent={() => camelHandled.setTrue()}
        on:CAPSevent={() => capsHandled.setTrue()}
        on:PascalEvent={() => pascalHandled.setTrue()}
      />
    </>
  );
};
