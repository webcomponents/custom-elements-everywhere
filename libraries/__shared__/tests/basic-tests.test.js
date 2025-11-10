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

import {expect, test} from '@playwright/test';
import {getPropOrAttr, weight} from './util';


test.beforeEach(async ({page}) => {
  await page.goto('/');
})

test.describe("basic support", weight(3), () => {
  test.describe("no children", () => {
    test("can display a Custom Element with no children", async ({page}) => {
      await expect(page.locator('#ce-without-children')).toBeAttached();
    });
  })

  test.describe('with children', () => {
    const expectHasChildren = async (wc) => {
      await expect(wc.locator('h1')).toHaveText('Test h1');
      await expect(wc.locator('p')).toHaveText('Test p');
    }

    test("can display a Custom Element with children in a Shadow Root", async ({page}) => {
      await expectHasChildren(page.locator('#ce-with-children'))
    })

    test("can display a Custom Element with children in a Shadow Root and pass in Light DOM children", async ({page}) => {
      const ce = page.locator('#ce-with-children-rerender');
      await expectHasChildren(ce);
      await expect(ce).toHaveText(/2/);
    })

    test('can display a Custom Element with children in the Shadow DOM and handle hiding and showing the element', async ({page}) => {
      const ce = page.locator('#ce-with-different-views')
      const toggle = page.getByRole('button', {name: /toggle views/i});

      await expectHasChildren(ce);

      await toggle.click();
      await expect(ce).toHaveText(/dummy view/i);

      await toggle.click();
      await expectHasChildren(ce);
    })

  });

  test.describe('attributes and properties', () => {
    test("will pass boolean data as either an attribute or a property", async ({page}) => {
      const ce = page.locator('#ce-with-properties');
      expect(await getPropOrAttr(ce, 'bool')).toEqual(true)
    });

    test("will pass numeric data as either an attribute or a property", async ({page}) => {
      const ce = page.locator('#ce-with-properties');
      expect(parseInt(await getPropOrAttr(ce, 'num'))).toEqual(42)
    });

    test("will pass string data as either an attribute or a property", async ({page}) => {
      const ce = page.locator('#ce-with-properties');
      expect(await getPropOrAttr(ce, 'str')).toEqual("custom")
    });
  });

  test.describe('events', () => {
    test("can imperatively listen to a DOM event dispatched by a Custom Element", async ({page}) => {
      const ce = page.locator('#ce-with-imperative-event');
      const result = page.locator('#ce-with-imperative-event-handled');
      await expect(result).toHaveText(/false/i);
      await ce.click();
      await expect(result).toHaveText(/true/i);
    })
  })

});