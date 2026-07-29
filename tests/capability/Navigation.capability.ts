import { Page } from '@playwright/test';

export class NavigationBehavior {
  constructor(private readonly page: Page) {}

  async loadApp() {
    await this.page.goto('');
  }
}