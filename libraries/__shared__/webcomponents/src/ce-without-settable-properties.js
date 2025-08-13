/**
 * @license
 * Copyright 2024 Google Inc. All rights reserved.
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


/**
 * This is a custom element that has methods and unsettable properties. It is used to test
 * heuristics used by frameworks, and catch those that naiively assume that 'x in obj' means that
 * obj is a settable property.
 */
class CEWithoutSettableProperties extends HTMLElement {

    amethod() {
        this.innerText = 'Success';
        return 'method';
    }

    get agetter() {
        return 'getter';
    }

    connectedCallback() {
        this.amethod();
    }

}

Object.defineProperty(CEWithoutSettableProperties.prototype, 'areadonly', {
    value: 'readonly',
    writable: false
});

customElements.define('ce-without-settable-properties', CEWithoutSettableProperties);
