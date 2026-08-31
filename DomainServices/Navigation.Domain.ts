import test, { Page } from '@playwright/test';
import { LoginComponent } from '../UiComponents/Login.comp';

export class NavigationAction {
  constructor(private readonly page: Page, private readonly url: string) {}

  async loadApp() : Promise<void>{
      await this.page.goto(this.url);
  }

    async ProviderDirectory(): Promise<void> {
    await test.step('Provider Directory accessed.', async () => {
      const loginComponent = new LoginComponent(this.page);
      await loginComponent.providerDirectory.click();
    });
  }
}


