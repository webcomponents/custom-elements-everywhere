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

import { render } from 'solid-js/web';
import { expect }  from "chai";
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

describe("basic support", function() {

  afterEach(function() { document.body.innerHTML = ""; });

  describe("no children", function() {
    it("can display a Custom Element with no children", function() {
      this.weight = 3;
      let wc;
      render(() => wc = <ComponentWithoutChildren />, document.body);
      expect(wc).to.exist;
    });
  });

  describe("with children", function() {
    function expectHasChildren(wc) {
      expect(wc).to.exist;
      let shadowRoot = wc.shadowRoot;
      let heading = shadowRoot.querySelector("h1");
      expect(heading).to.exist;
      expect(heading.textContent).to.eql("Test h1");
      let paragraph = shadowRoot.querySelector("p");
      expect(paragraph).to.exist;
      expect(paragraph.textContent).to.eql("Test p");
    }

    it("can display a Custom Element with children in a Shadow Root", function() {
      this.weight = 3;
      let wc;
      render(() => wc = <ComponentWithChildren />, document.body);
      expectHasChildren(wc);
    });

    it("can display a Custom Element with children in a Shadow Root and pass in Light DOM children", async function() {
      this.weight = 3;
      let wc;
      render(() => wc = <ComponentWithChildrenRerender />, document.body);
      await Promise.resolve();
      expectHasChildren(wc);
      expect(wc.textContent.includes("2")).to.be.true;
    });

    it("can display a Custom Element with children in the Shadow DOM and handle hiding and showing the element", function() {
      this.weight = 3;
      let toggle, root;
      render(() => root = <ComponentWithDifferentViews setToggle={fn => toggle = fn} />, document.body);
      let wc = document.querySelector('#wc');
      expectHasChildren(wc);
      toggle();
      let dummy = document.querySelector('#dummy');
      expect(dummy).to.exist;
      expect(dummy.textContent).to.eql("Dummy view");
      toggle();
      wc = document.querySelector('#wc');
      expectHasChildren(wc);
    });
  });

  describe("attributes and properties", function() {
    it("will pass boolean data as either an attribute or a property", function() {
      this.weight = 3;
      let wc;
      render(() => wc = <ComponentWithProperties />, document.body);
      let data = wc.bool || wc.hasAttribute("bool");
      expect(data).to.be.true;
    });

    it("will pass numeric data as either an attribute or a property", function() {
      this.weight = 3;
      let wc;
      render(() => wc = <ComponentWithProperties />, document.body);
      let data = wc.num || wc.getAttribute("num");
      expect(parseInt(data, 10)).to.eql(42);
    });

    it("will pass string data as either an attribute or a property", function() {
      this.weight = 3;
      let wc;
      render(() => wc = <ComponentWithProperties />, document.body);
      let data = wc.str || wc.getAttribute("str");
      expect(data).to.eql("Solid");
    });

    // TODO: Is it the framework's responsibility to check if the underlying
    // property is defined? Or should it just always assume it is and do its
    // usual default behavior? Preact will actually check if it's defined and
    // use an attribute if it is not, otherwise it prefers properties for
    // everything. Is there a "right" answer in this situation?

    // it('will set boolean attributes on a Custom Element that has not already been defined and upgraded', function() {
    //   let root = ReactDOM.render(<ComponentWithUnregistered />, scratch);
    //   let wc = ReactDOM.findDOMNode(root.refs.wc);
    //   expect(wc.hasAttribute('bool')).to.be.true;
    // });

    // it('will set numeric attributes on a Custom Element that has not already been defined and upgraded', function() {
    //   let root = ReactDOM.render(<ComponentWithUnregistered />, scratch);
    //   let wc = ReactDOM.findDOMNode(root.refs.wc);
    //   expect(wc.getAttribute('num')).to.eql('42');
    // });

    // it('will set string attributes on a Custom Element that has not already been defined and upgraded', function() {
    //   let root = ReactDOM.render(<ComponentWithUnregistered />, scratch);
    //   let wc = ReactDOM.findDOMNode(root.refs.wc);
    //   expect(wc.getAttribute('str')).to.eql('React');
    // });

    // it('will set array attributes on a Custom Element that has not already been defined and upgraded', function() {
    //   let root = ReactDOM.render(<ComponentWithUnregistered />, scratch);
    //   let wc = ReactDOM.findDOMNode(root.refs.wc);
    //   expect(wc.getAttribute('arr')).to.eql(JSON.stringify(['R', 'e', 'a', 'c', 't']));
    // });

    // it('will set object attributes on a Custom Element that has not already been defined and upgraded', function() {
    //   let root = ReactDOM.render(<ComponentWithUnregistered />, scratch);
    //   let wc = ReactDOM.findDOMNode(root.refs.wc);
    //   expect(wc.getAttribute('obj')).to.eql(JSON.stringify({ org: 'facebook', repo: 'react' }));
    // });
  });

  describe("events", function() {
    it("can imperatively listen to a DOM event dispatched by a Custom Element", function() {
      this.weight = 3;
      let root;
      render(() => root = <ComponentWithImperativeEvent />, document.body);
      let handled = root[0];
      let wc = root[1];
      expect(handled.textContent).to.eql("false");
      wc.click();
      expect(handled.textContent).to.eql("true");
    });
  });

});
