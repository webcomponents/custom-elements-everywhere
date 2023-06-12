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

import "ce-without-children"
import "ce-with-children"
import "ce-with-properties"
import "ce-with-event"

import { render, h } from "skruv"
import { createState } from "skruv/utils/state.js"
import { syncify } from "skruv/utils/syncify.js"

export const ComponentWithoutChildren = node =>
  render(
    h("div", {}, [h("ce-without-children", { id: "wc" })]),
    node,
  )

export const ComponentWithChildren = node =>
  render(
    h("div", {}, [h("ce-with-children", { id: "wc" })]),
    node,
  )

export const ComponentWithChildrenRerender = node => {
  const state = createState({ count: 1 })
  render(
    syncify(
      h("div", {}, async function* () {
        for await (const currentState of state) {
          yield h("ce-with-children", { id: "wc" }, currentState.count)
        }
      })
    ),
    node
  )
  requestAnimationFrame(() => { state.count++ })
}

export const ComponentWithDifferentViews = node => {
  const state = createState({ showWC: true })
  render(
    syncify(
      h("div", {}, async function* () {
        for await (const currentState of state) {
          yield currentState.showWC
            ? h("ce-with-children", { id: "wc" })
            : h("div", { id: "dummy" }, "Dummy view")
        }
      })
    ),
    node
  )
  return () => { state.showWC = !state.showWC }
}

export const ComponentWithProperties = node =>
  render(
    h("div", {}, [
      h("ce-with-properties", {
        id: "wc",
        bool: true,
        num: 42,
        str: "Skruv",
        arr: ["S", "k", "r", "u", "v"],
        obj: { org: "skruv", repo: "skruv" },
      }),
    ]),
    node)

export const ComponentWithImperativeEvent = node => {
  const state = createState({ handled: false })
  render(
    syncify(
      h("div", {}, async function* () {
        for await (const currentState of state) {
          yield [h("div", { id: "handled" }, currentState.handled ? "true" : "false"),
          h("ce-with-event", { id: "wc", oncamelEvent: (e) => { currentState.handled = true } })]
        }
      })
    ),
    node
  )
}

export const ComponentWithDeclarativeEvent = node => {
  const state = createState({
    lowercaseHandled: false,
    kebabHandled: false,
    capsHandled: false,
    pascalHandled: false,
  })
  render(
    syncify(
      h("div", {}, async function* () {
        for await (const currentState of state) {
          yield [h(
            "div",
            { id: "lowercase" },
            state.lowercaseHandled ? "true" : "false"
          ),
          h("div", { id: "kebab" }, currentState.kebabHandled ? "true" : "false"),
          h("div", { id: "camel" }, currentState.camelHandled ? "true" : "false"),
          h("div", { id: "caps" }, currentState.capsHandled ? "true" : "false"),
          h(
            "div",
            { id: "pascal" },
            currentState.pascalHandled ? "true" : "false"
          ),
          h("ce-with-event", {
            id: "wc",
            onlowercaseevent: () => { currentState.lowercaseHandled = true },
            "onkebab-event": () => { currentState.kebabHandled = true },
            oncamelEvent: () => { currentState.camelHandled = true },
            onCAPSevent: () => { currentState.capsHandled = true },
            onPascalEvent: () => { currentState.pascalHandled = true },
          })]
        }
      })
    ),
    node
  )
}
