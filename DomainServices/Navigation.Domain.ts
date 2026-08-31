import { Page } from '@playwright/test';


export class NavigationAction {
  constructor(private readonly page: Page, private readonly url: string) {}

  async loadApp() : Promise<void>{
      await this.page.goto(this.url);
  }
}


