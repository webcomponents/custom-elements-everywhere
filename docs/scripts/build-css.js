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

const fs = require('fs');
const path = require('path');
const CleanCSS = require('clean-css');

const bulma = fs.readFileSync(path.resolve(__dirname, '../styles/third_party/bulma.css'), 'utf-8');
const site = fs.readFileSync(path.resolve(__dirname, '../styles/site.css'));

fs.mkdirSync(path.resolve(__dirname, '../../out/styles'), {recursive: true});
fs.writeFileSync(path.resolve(__dirname, '../../out/styles/bundle.css'), new CleanCSS().minify(bulma + site).styles);