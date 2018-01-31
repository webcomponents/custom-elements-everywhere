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

import S from 's-js';
import * as Surplus from "surplus";
import expect from "expect";
import {
  ComponentWithoutChildren,
  ComponentWithChildren,
  ComponentWithChildrenRerender,
  ComponentWithDifferentViews,
  ComponentWithProperties,
  ComponentWithUnregistered,
  ComponentWithImperativeEvent,
  ComponentWithDeclarativeEvent
} from "./components";

//let _it = it;
//it = (title, fn) => _it(title, () => S.root(fn));

describe("basic support", function() {

  describe("no children", function() {
    it("can display a Custom Element with no children", function() {
      S.root(() => {
        this.weight = 3;
        let root = <ComponentWithoutChildren />;
        let wc = root.wc;
        expect(wc).toExist();
      });
    });
  });

  describe("with children", function() {
    function expectHasChildren(wc) {
      expect(wc).toExist();
      let shadowRoot = wc.shadowRoot;
      let heading = shadowRoot.querySelector("h1");
      expect(heading).toExist();
      expect(heading.textContent).toEqual("Test h1");
      let paragraph = shadowRoot.querySelector("p");
      expect(paragraph).toExist();
      expect(paragraph.textContent).toEqual("Test p");
    }

    it("can display a Custom Element with children in a Shadow Root", function() {
      S.root(() => {
        this.weight = 3;
        let root = <ComponentWithChildren />;
        let wc = root.wc;
        expectHasChildren(wc);
      });
    });

    it("can display a Custom Element with children in a Shadow Root and pass in Light DOM children", async function() {
      S.root(async () => {
        this.weight = 3;
        let root = <ComponentWithChildrenRerender />;
        let wc = root.wc;
        await Promise.resolve();
        expectHasChildren(wc);
        expect(wc.textContent.includes("2")).toEqual(true);
      });
    });

    it("can display a Custom Element with children in the Shadow DOM and handle hiding and showing the element", function() {
      S.root(() => {
        this.weight = 3;
        let { root, toggle } = <ComponentWithDifferentViews />;
        let wc = root.wc;
        expectHasChildren(wc);
        toggle();
        let dummy = root.dummy;
        expect(dummy).toExist();
        expect(dummy.textContent).toEqual("Dummy view");
        toggle();
        wc = root.wc;
        expectHasChildren(wc);
      });
    });
  });

  describe("attributes and properties", function() {
    it("will pass boolean data as either an attribute or a property", function() {
      S.root(() => {
        this.weight = 3;
        let root = <ComponentWithProperties />;
        let wc = root.wc;
        let data = wc.bool || wc.hasAttribute("bool");
        expect(data).toBe(true);
      });
    });

    it("will pass numeric data as either an attribute or a property", function() {
      S.root(() => {
        this.weight = 3;
        let root = <ComponentWithProperties />;
        let wc = root.wc;
        let data = wc.num || wc.getAttribute("num");
        expect(data).toEqual(42);
      });
    });

    it("will pass string data as either an attribute or a property", function() {
      S.root(() => {
        this.weight = 3;
        let root = <ComponentWithProperties />;
        let wc = root.wc;
        let data = wc.str || wc.getAttribute("str");
        expect(data).toEqual("Surplus");
      });
    });

    // TODO: Is it the framework's responsibility to check if the underlying
    // property is defined? Or should it just always assume it is and do its
    // usual default behavior? Preact will actually check if it's defined and
    // use an attribute if it is not, otherwise it prefers properties for
    // everything. Is there a "right" answer in this situation?

    // it('will set boolean attributes on a Custom Element that has not already been defined and upgraded', function() {
    //   let root = ReactDOM.render(<ComponentWithUnregistered />, scratch);
    //   let wc = ReactDOM.findDOMNode(root.refs.wc);
    //   expect(wc.hasAttribute('bool')).toBe(true);
    // });

    // it('will set numeric attributes on a Custom Element that has not already been defined and upgraded', function() {
    //   let root = ReactDOM.render(<ComponentWithUnregistered />, scratch);
    //   let wc = ReactDOM.findDOMNode(root.refs.wc);
    //   expect(wc.getAttribute('num')).toEqual('42');
    // });

    // it('will set string attributes on a Custom Element that has not already been defined and upgraded', function() {
    //   let root = ReactDOM.render(<ComponentWithUnregistered />, scratch);
    //   let wc = ReactDOM.findDOMNode(root.refs.wc);
    //   expect(wc.getAttribute('str')).toEqual('React');
    // });

    // it('will set array attributes on a Custom Element that has not already been defined and upgraded', function() {
    //   let root = ReactDOM.render(<ComponentWithUnregistered />, scratch);
    //   let wc = ReactDOM.findDOMNode(root.refs.wc);
    //   expect(wc.getAttribute('arr')).toEqual(JSON.stringify(['R', 'e', 'a', 'c', 't']));
    // });

    // it('will set object attributes on a Custom Element that has not already been defined and upgraded', function() {
    //   let root = ReactDOM.render(<ComponentWithUnregistered />, scratch);
    //   let wc = ReactDOM.findDOMNode(root.refs.wc);
    //   expect(wc.getAttribute('obj')).toEqual(JSON.stringify({ org: 'facebook', repo: 'react' }));
    // });
  });

  describe("events", function() {
    it("can imperatively listen to a DOM event dispatched by a Custom Element", function() {
      S.root(() => {
        this.weight = 3;
        let root = <ComponentWithImperativeEvent />;
        let wc = root.wc;
        let handled = root.handled;
        expect(handled.textContent).toEqual("false");
        wc.click();
        expect(handled.textContent).toEqual("true");
      });
    });
  });

});
