import QUnit, { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render, find } from "@ember/test-helpers";

import {
  ComponentWithoutChildren,
  ComponentWithChildren,
  ComponentWithChildrenRerender,
  ComponentWithDifferentViews,
  ComponentWithProperties,
  ComponentWithUnregistered,
  ComponentWithImperativeEvent,
  ComponentWithDeclarativeEvent,
} from "ember-cee-app/components/cee-scenarios";

module("basic support", function (hooks) {
  setupRenderingTest(hooks);

  module("no children", function () {
    test("can display a Custom Element with no children", async function (assert) {
      await render(
        <template>
          <ComponentWithoutChildren />
        </template>
      );

      assert.dom('#wc').exists();
    });
  });

  module('with children', function () {
    function expectHasChildren() {
      const { assert } = QUnit;
      let wc = find('#wc');

      assert.dom(wc).exists();

      let shadowRoot = wc.shadowRoot;
      let heading = shadowRoot.querySelector("h1");

      assert.dom(heading).exists();
      assert.strictEqual(heading.textContent, "Test h1");

      let paragraph = shadowRoot.querySelector("p");

      assert.dom(paragraph).exists();
      assert.strictEqual(paragraph.textContent, "Test p");
    }
  });
});
