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

import React from 'react';
import 'wc/ce-without-children';
import 'wc/ce-with-children';
import 'wc/ce-with-properties';
import 'wc/ce-with-event';

export const ComponentWithoutChildren = () => (
  <div>
    <ce-without-children id="ce-without-children"></ce-without-children>
  </div>
);


export const ComponentWithChildren = () => (
  <div>
    <ce-with-children id="ce-with-children"></ce-with-children>
  </div>
);

export const ComponentWithChildrenRerender = () => {
  const [count, setCount] = React.useState(1);

  React.useEffect(() => {
    Promise.resolve().then(() => setCount(count => count + 1));
  }, []);

  return (
    <div>
      <ce-with-children id="ce-with-children-rerender">{count}</ce-with-children>
    </div>
  );
}

export const ComponentWithDifferentViews = () => {
  const [showWC, setShowWC] = React.useState(true);
  return (
    <div id="ce-with-different-views">
      <button onClick={() => setShowWC(showWC => !showWC)}>Toggle views</button>
      {showWC ? (
        <ce-with-children></ce-with-children>
      ) : (
        <div>Dummy view</div>
      )}
    </div>
  );
}

export const ComponentWithProperties = () => {
  const data = {
    bool: true,
    num: 42,
    str: 'custom',
    arr: ['c', 'u', 's', 't', 'o', 'm'],
    obj: { org: 'webcomponents', repo: 'custom-elements-everywhere' },
    camelCaseObj: {label: "passed"}
  };
  return (
    <div>
      <ce-with-properties
        id="ce-with-properties"
        bool={data.bool}
        num={data.num}
        str={data.str}
        arr={data.arr}
        obj={data.obj}
        camelCaseObj={data.camelCaseObj}
      ></ce-with-properties>
    </div>
  );
}

export const ComponentWithUnregistered = () => {
  const data = {
    bool: true,
    num: 42,
    str: 'custom',
    arr: ['c', 'u', 's', 't', 'o', 'm'],
    obj: { org: 'webcomponents', repo: 'custom-elements-everywhere' }
  };
  return (
    <div>
      {/* This element doesn't actually exist.
        It's used to test unupgraded behavior. */}
      <ce-unregistered
        id="ce-with-unregistered"
        bool={data.bool}
        num={data.num}
        str={data.str}
        arr={data.arr}
        obj={data.obj}
      ></ce-unregistered>
    </div>
  );
}

export const ComponentWithImperativeEvent = () => {
  const [eventHandled, setEventHandled] = React.useState(false);
  const ref = React.useRef();

  React.useEffect(() => {
    ref.current?.addEventListener('camelEvent', () => setEventHandled(true));
  }, [])

  return (
    <div>
      <div id="ce-with-imperative-event-handled">{eventHandled.toString()}</div>
      <ce-with-event id="ce-with-imperative-event" ref={ref}>
        Imperative
      </ce-with-event>
    </div>
  );
}

export const ComponentWithDeclarativeEvent = () => {
  const [lowercaseHandled, setLowercaseHandled] = React.useState(false);
  const [kebabHandled, setKebabHandled] = React.useState(false);
  const [camelHandled, setCamelHandled] = React.useState(false);
  const [capsHandled, setCapsHandled] = React.useState(false);
  const [pascalHandled, setPascalHandled] = React.useState(false);
  return (
    <div>
      <div>lowercase: {lowercaseHandled.toString()}</div>
      <div>kebab-case: {kebabHandled.toString()}</div>
      <div>camelCase: {camelHandled.toString()}</div>
      <div>CAPScase: {capsHandled.toString()}</div>
      <div>PascalCase: {pascalHandled.toString()}</div>
      <ce-with-event
        id="ce-with-declarative-event"
        onlowercaseevent={() => setLowercaseHandled(true)}
        onkebab-event={() => setKebabHandled(true)}
        oncamelEvent={() => setCamelHandled(true)}
        onCAPSevent={() => setCapsHandled(true)}
        onPascalEvent={() => setPascalHandled(true)}
      >Declarative
      </ce-with-event>
    </div>
  );
}
