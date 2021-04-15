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

import {Component, register, createComponent, useButton, getTagDef, ButtonComponent, mixin} from 'lotusjs-components';
import compose from 'ramda/es/compose';

// create component using compose, see build in button and image gallery for more interesting example
const useComponent: () => Component = compose(createComponent);
// create a toggle component to test clicks
export const createToggleComponent = (component: Component): ButtonComponent => {
    const clone =  mixin<ButtonComponent>(component,{});
    const onClick = clone.onClick;
    clone.onClick = (event) => {
        onClick(event);
        const bit = clone.skinPartMap.get('dummy')?.style.display === 'none';
        (clone.skinPartMap.get('dummy') as HTMLElement).style.display =
            bit ? 'block' : 'none';
        (clone.skinPartMap.get('ceWithChild') as HTMLElement).style.display =
            !bit ? 'block' : 'none';
    };
    return clone;
};
const useToggleComponent: () => ButtonComponent = compose(createToggleComponent, useButton);
// create a toggle component to test clicks
export const createEventComponent = (component: Component): Component => {
    const clone =  mixin<Component>(component,{});
    clone.onSkinPartAdded = (part: string) => {
        switch (part) {
            case 'ceWithEvents':
                console.log(`Lotus.ButtonComponent.prototype.onSkinPartAdded: part: ${part}`);
                const handler = (event: Event) => {
                    const events = clone.skinPartMap?.get(part)?.getAttribute('events') || '';
                    clone.skinPartMap?.get(part)?.setAttribute('events', events.concat(`${event.type} `));
                };
                clone.skinPartMap?.get(part)?.addEventListener('lowercaseevent', handler);
                clone.skinPartMap?.get(part)?.addEventListener('kebab-event', handler);
                clone.skinPartMap?.get(part)?.addEventListener('camelEvent', handler);
                clone.skinPartMap?.get(part)?.addEventListener('CAPSevent', handler);
                clone.skinPartMap?.get(part)?.addEventListener('PascalEvent', handler);
                break;
        }
    };
    return clone;
};
const useEventComponent: () => Component = compose(createEventComponent, createComponent);
const render = async (tagName: string, templateHtml: string, component: () => Component ) => {
    const template = document.createElement('div');
    template.innerHTML = templateHtml;
    const tagDef = {
        hydrated: false,
        template: template.firstChild as HTMLTemplateElement,
        tagName: tagName,
        inserted: (component: Component) => {
        },
        removed: (component: Component) => {
        },
        tagFunction: component,
    };
    if (!getTagDef(tagDef.tagName)) {
        await register(tagDef);
    }

    // create our component
    const element = document.createElement(tagName);
    document.body.append(element);
    return element;
}

export const ComponentWithoutChildren = async () => {
    return await render(
        'lotus-component-without-children',
        '<template id="app">\n' +
        '  <div data-component-root="root">\n' +
            '<ce-without-children/>\n' +
        '  </div>\n' +
        '</template>\n',
        useComponent
    );
}

export const ComponentWithChildren = async () => {
    return await render(
        'lotus-component-with-children',
        '<template id="app">\n' +
        '  <div data-component-root="root">\n' +
        '    <ce-with-children/>\n' +
        '  </div>\n' +
        '</template>\n',
        useComponent
    );
};

export const ComponentWithChildrenRerender = async () => {
    return await render(
        'lotus-component-with-child-render',
        '<template id="app">\n' +
        '  <div data-component-root="root">\n' +
        '    <ce-with-children>1</ce-with-children>\n' +
        '  </div>\n' +
        '</template>\n',
        useComponent
    );
};

export const ComponentWithDifferentViews = async () => {
    return await render(
        'lotus-component-with-toggle-views',
        '<template id="app">\n' +
        '  <div data-component-root="root">\n' +
        '    <button data-skin-part="button">\n' +
        '      <label>Toggle Button</label>\n' +
        '    </button>\n' +
        '    <div data-skin-part="dummy" style="display: none">Dummy view</div>' +
        '    <ce-with-children data-skin-part="ceWithChild" style="display: block">1</ce-with-children>\n' +
        '  </div>\n' +
        '</template>\n',
        useToggleComponent
    );
};

export const ComponentWithProperties = async () => {
    return await render(
        'lotus-component-with-props',
        '<template id="app">\n' +
        '  <div data-component-root="root">\n' +
        '    <ce-with-properties bool="true" num="42" str="lotus"/>\n' +
        '  </div>\n' +
        '</template>\n',
        useComponent
    );
};

export const ComponentWithUnregistered = undefined;

export const ComponentWithImperativeEvent = async () => {
    return await render(
        'lotus-component-with-events',
        '<template id="app">\n' +
        '  <div data-component-root="root">\n' +
        '    <ce-with-event data-skin-part="ceWithEvents"/>\n' +
        '  </div>\n' +
        '</template>\n',
        useEventComponent
    );
};

export const ComponentWithDeclarativeEvent = undefined;
