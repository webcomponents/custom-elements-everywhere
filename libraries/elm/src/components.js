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

import 'ce-without-children'
import 'ce-with-children'
import 'ce-with-properties'
import 'ce-with-event'

import WoC from './WithoutChildren.elm';
import WC from './WithChildren.elm';
import WCR from './WithChildrenRender.elm';
import WDV from './WithDifferentViews.elm';
import WP from './WithProperties.elm';
import WIE from './WithImperativeEvent.elm';
import WDE from './WithDeclartaiveEvent.elm';

export const componentWithoutChildren = (node) =>
  WoC.Elm.WithoutChildren.init({ node });

export const componentWithChildren = (node) =>
  WC.Elm.WithChildren.init({ node });

export const componentWithChildrenRerender = (node) =>
  WCR.Elm.WithChildrenRender.init ({ node });

export const componentWithDifferentViews = (node) =>
  WDV.Elm.WithDifferentViews.init({ node });

export const componentWithProperties = (node) =>
  WP.Elm.WithProperties.init({ node });


export const componentWithImperativeEvent = (node) =>
  WIE.Elm.WithImperativeEvent.init({ node });

export const componentWithDeclarativeEvent = (node) =>
  WDE.Elm.WithDeclartaiveEvent.init({ node });
