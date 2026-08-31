import { Locator } from '@playwright/test';

// Base class for all Questions: answering a question about app state must never throw.
export abstract class Question {
  protected async tryWaitFor(locator: Locator, timeout = 5000): Promise<boolean> {
    return locator
      .waitFor({ state: 'visible', timeout })
      .then(() => true)
      .catch(() => false);
  }
}
