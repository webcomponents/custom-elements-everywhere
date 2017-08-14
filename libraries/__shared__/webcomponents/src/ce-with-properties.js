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

class CEWithProperties extends HTMLElement {
  set bool(value) {
    this._bool = value;
  }
  get bool() {
    return this._bool;
  }
  set num(value) {
    this._num = value;
  }
  get num() {
    return this._num;
  }
  set str(value) {
    this._str = value;
  }
  get str() {
    return this._str;
  }
  set arr(value) {
    this._arr = value;
  }
  get arr() {
    return this._arr;
  }
  set obj(value) {
    this._obj = value;
  }
  get obj() {
    return this._obj;
  }
}

customElements.define('ce-with-properties', CEWithProperties);
