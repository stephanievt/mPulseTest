import { Page } from '@playwright/test';


export class NavigationAction {
  constructor(private readonly page: Page) {}

  async loadApp() : Promise<void>{
      await this.page.goto('');
  }
}