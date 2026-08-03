import { Page, test } from '@playwright/test';


export class NavigationAction {
  constructor(private readonly page: Page) {}

  async loadApp() : Promise<void>{
    await test.step('step name', async () => {
      await this.page.goto('');
      
    });
    
  }
}