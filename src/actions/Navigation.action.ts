import { Page } from '@playwright/test';
import {test} from '../fixtures/fixtures'

export class NavigationAction {
  constructor(private readonly page: Page) {}

  async loadApp() {
    await test.step('step name', async () => {
      await this.page.goto('');
    });
    
  }
}