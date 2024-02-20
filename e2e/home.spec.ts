/**
 * @note
 * - make sure local dev environment is ready (pnpm dev)
 */

import { test, expect } from '@playwright/test';

/** replace with env vars if needed */
const LOCAL_HOST_URL = 'http://localhost:3000/';
const APP_NAME = 'Pokedex React | Next Js | Chakra UI';

test('should shown home page', async ({ page }) => {
  await page.goto(LOCAL_HOST_URL);
  await expect(page.locator('h1')).toContainText(APP_NAME);
});
