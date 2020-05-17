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

import {t, inform, exec, onNextRender, scoped} from 'ef.js/dist/ef.min.js'
import 'ce-without-children'
import 'ce-with-children'
import 'ce-with-properties'
import 'ce-with-event'

const ListHolder = t`+children`
const LogicContainer = t`-childrenHolder`

const Logic = class extends LogicContainer {
  constructor(...args) {
    inform()
    super(...args)
    this.$ctx.childrenHolder = new ListHolder()
    exec()
  }

  set ifTrue(value) {
    if (value) this.childrenHolder = this.$ctx.childrenHolder
    else this.childrenHolder = null
  }

  set ifFalse(value) {
    if (value) this.childrenHolder = null
    else this.childrenHolder = this.$ctx.childrenHolder
  }

  get children() {
    return this.$ctx.childrenHolder.children
  }

  set children(children) {
    this.$ctx.childrenHolder.children = children
  }
}

export const ComponentWithoutChildren = t`
>div#root
  >ce-without-children
    #id = wc
`

export const ComponentWithChildren = t`
>div#root
  >ce-with-children
    #id = wc
`

export const ComponentWithChildrenRerender = class extends t`
>div#root
  >ce-with-children
    #id = wc
    .{{count = 1}}
` {
  $mount(...args) {
    inform()
    super.$mount(...args)
    onNextRender(() => {
      setTimeout(() => {
        this.$data.count += 1
      }, 0)
    })
    return exec()
  }
}

export const ComponentWithDifferentViews = class extends scoped(t`
>div#root
  >Logic
    #ifTrue = {{showWC = true}}
    >ce-with-children
      #id = wc
  >Logic
    #ifFalse = {{showWC}}
    >div
      #id = dummy
      .Dummy view
`, {Logic}) {
  toggle() {
    this.$data.showWC = !this.$data.showWC
  }
}

export const ComponentWithProperties = class extends t`
>div#root
  >ce-with-properties
    #id = wc
    %bool = true
    %num = 42
    %str = ef.js
    %arr = {{arr}}
    %obj = {{obj}}
` {
  constructor(state = {}, ...args) {
    inform()
    super({
      $data: {
        arr: ['e', 'f', '.', 'j', 's'],
        obj: {org: 'TheNeuronProject', repo: 'ef.js'}
      }
    }, ...args)
    this.$update(state)
    exec()
  }
}

export const ComponentWithUnregistered = class extends t`
>div#root
  This element doesn't actually exist.
  It's used to test unupgraded behavior.
  >ce-unregistered
    #id = wc
    %bool = true
    %num = 42
    %str = ef.js
    %arr = {{arr}}
    %obj = {{obj}}
` {
  constructor(newState = {}, ...args) {
    inform()
    super({
      $data: {
        arr: ['e', 'f', '.', 'j', 's'],
        obj: {org: 'TheNeuronProject', repo: 'ef.js'}
      }
    }, ...args)
    this.$update(newState)
    exec()
  }
}

export const ComponentWithImperativeEvent = class extends t`
>div#root
  >div
    #id = handled
    .{{eventHandled = false}}
  >ce-with-event#customElement
    #id = wc
` {
  constructor(...args) {
    super(...args)
    this.$refs.customElement.addEventListener('camelEvent', () => {
      this.$data.eventHandled = true
    })
  }
}

export const ComponentWithDeclarativeEvent = class extends t`
>div#root
  >div
    #id = lowercase
    .{{lowercaseHandled = false}}
  >div
    #id = kebab
    .{{kebabHandled = false}}
  >div
    #id = camel
    .{{camelHandled = false}}
  >div
    #id = caps
    .{{capsHandled = false}}
  >div
    #id = pascal
    .{{pascalHandled = false}}
  >ce-with-event
    #id = wc
    @lowercaseevent = handleLowercaseEvent
    @kebab-event = handleKebabEvent
    @camelEvent = handleCamelEvent
    @CAPSevent = handleCapsEvent
    @PascalEvent = handlePascalEvent
` {
  constructor(newState = {}, ...args) {
    inform()
    super({
      $methods: {
        handleLowercaseEvent({state}) {
          state.$data.lowercaseHandled = true
        },
        handleKebabEvent({state}) {
          state.$data.kebabHandled = true
        },
        handleCamelEvent({state}) {
          state.$data.camelHandled = true
        },
        handleCapsEvent({state}) {
          state.$data.capsHandled = true
        },
        handlePascalEvent({state}) {
          state.$data.pascalHandled = true
        }
      }
    }, ...args)
    this.$update(newState)
    exec()
  }
}
