import { test as baseTest, expect, Page, TestInfo, Location } from '@playwright/test';

// Per-worker state: Playwright runs tests serially within a worker, so this is safe.
let _page: Page | null = null;
let _testInfo: TestInfo | null = null;

export const test = baseTest.extend({
  page: async ({ page }, use, testInfo) => {
    _page = page;
    _testInfo = testInfo;
    await use(page);
    _page = null;
    _testInfo = null;
  },
});

// Capture the real step AFTER test is defined, then replace it.
const _originalStep = test.step.bind(test);

async function wrappedStep(
  title: string,
  body?: () => Promise<any>,
  options?: { box?: boolean; location?: Location; timeout?: number },
) {
  return _originalStep(title, async () => {
    const result = body ? await body() : undefined;
    if (_page && _testInfo) {
      const screenshot = await _page.screenshot({ fullPage: false });
      await _testInfo.attach(`${title} - Visual State`, {
        body: screenshot,
        contentType: 'image/png',
      });
    }
    return result;
  }, options);
}

(wrappedStep as any).skip = (_originalStep as any).skip;
(test as any).step = wrappedStep;

export { expect } from '@playwright/test';