import test, { Page } from '@playwright/test';
import { LoginComponent } from '../UiModel/Login.comp';
import { ProviderSearchPageComponent } from '../UiModel/ProviderSearchPage.comp';
import { narrate } from '../Framework/Gherkin';
import { Organization } from '../DataModel/OrganizationModel';
import { AdminMainComponent } from '../UiModel/AdministrationComponents/AdminMain.comp';

export class NavigationDomain {
  constructor(private readonly page: Page, private readonly url: string) {}

  async loadApp() : Promise<void>{
      await this.page.goto(this.url);
  }

  async NavigateProviderDirectory(): Promise<void> {
  await test.step('Provider Directory accessed.', async () => {
    await narrate('Opened the Provider Directory page from the main navigation menu.');
    const loginComponent = new LoginComponent(this.page);
    await loginComponent.providerDirectory.click();
        
  });
}

  

}


