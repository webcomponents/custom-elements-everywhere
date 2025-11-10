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
import {getProp, weight} from "./util";

test.beforeEach(async ({page}) => {
  await page.goto('/');
})

test.describe('advanced support', weight(2), () => {
  test.describe('attributes and properties', () => {
    test('will pass array data as a property', async ({page}) => {
      const ce = page.locator('#ce-with-properties');
      expect(await getProp(ce, 'arr')).toEqual(['c', 'u', 's', 't', 'o', 'm'])
    })

    test('will pass object data as a property', async ({page}) => {
      const ce = page.locator('#ce-with-properties');
      expect(await getProp(ce, 'obj')).toEqual({org: 'webcomponents', repo: 'custom-elements-everywhere'})
    })

    test("will pass object data to a camelCase-named property", async ({page}) => {
      const ce = page.locator('#ce-with-properties');
      expect(await getProp(ce, 'camelCaseObj')).toEqual({label: "passed"})
    })
  });

  test.describe('events', weight(1), () => {

    test("can declaratively listen to a lowercase DOM event dispatched by a Custom Element", weight(2), async ({page}) => {
      const ce = page.locator('#ce-with-declarative-event');
      await expect(page.getByText(/lowercase:/)).toHaveText(/false/);
      await ce.click();
      await expect(page.getByText(/lowercase:/)).toHaveText(/true/);
    })

    test("can declaratively listen to a camelCase DOM event dispatched by a Custom Element", async ({page}) => {
      const ce = page.locator('#ce-with-declarative-event');
      await expect(page.getByText(/camelCase:/)).toHaveText(/false/);
      await ce.click();
      await expect(page.getByText(/camelCase:/)).toHaveText(/true/);
    })
    test("can declaratively listen to a kebab-case DOM event dispatched by a Custom Element", async ({page}) => {
      const ce = page.locator('#ce-with-declarative-event');
      await expect(page.getByText(/kebab-case:/)).toHaveText(/false/);
      await ce.click();
      await expect(page.getByText(/kebab-case:/)).toHaveText(/true/);
    })
    test("can declaratively listen to a CAPScase DOM event dispatched by a Custom Element", async ({page}) => {
      const ce = page.locator('#ce-with-declarative-event');
      await expect(page.getByText(/CAPScase:/)).toHaveText(/false/);
      await ce.click();
      await expect(page.getByText(/CAPScase:/)).toHaveText(/true/);
    })
    test("can declaratively listen to a PascalCase DOM event dispatched by a Custom Element", async ({page}) => {
      const ce = page.locator('#ce-with-declarative-event');
      await expect(page.getByText(/PascalCase:/)).toHaveText(/false/);
      await ce.click();
      await expect(page.getByText(/PascalCase:/)).toHaveText(/true/);
    })
  });
})