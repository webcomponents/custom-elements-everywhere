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

import 'ce-without-children';
import 'ce-with-children';
import 'ce-with-properties';
import 'ce-with-event';

import {Component, register, createComponent} from 'lotusjs-components';
import compose from 'ramda/es/compose';

// create component using compose, see build in button and image gallery for more interesting example
const useComponent: () => Component = compose(createComponent);
const render = async (tagName: string, templateHtml: string, component: () => Component ) => {
    const template = document.createElement('div');
    template.innerHTML = templateHtml;
    const tagDef = {
        hydrated: false,
        template: template.firstChild as HTMLTemplateElement,
        tagName: tagName,
        tagFunction: component,
    };
    await register(tagDef);
    // create our component
    const element = document.createElement(tagName);
    document.body.append(element);
    return element;
}

export const ComponentWithoutChildren = async () => {
    return await render(
        '<template id="app">\n' +
        '  <div data-component-root="root">\n' +
        '  </div>\n' +
        '</template>\n',
        'lotus-component-without-children',
        useComponent
    );
}

export const ComponentWithChildren = async () => {
    return await render(
        '<template id="app">\n' +
        '  <div data-component-root="root">\n' +
        '    <ce-with-children/>\n' +
        '  </div>\n' +
        '</template>\n',
        'lotus-component-without-children',
        useComponent
    );
};

export const ComponentWithChildrenRerender = undefined;

export const ComponentWithDifferentViews = undefined;

export const ComponentWithProperties = undefined;

export const ComponentWithUnregistered = undefined;

export const ComponentWithImperativeEvent = undefined;

export const ComponentWithDeclarativeEvent = undefined;
