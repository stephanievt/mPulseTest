import { Page, test } from '@playwright/test';
import { NavigationAction } from '../actions/Navigation.action';
import { LoginAction } from '../actions/Login.action';
import { User } from '../model/User';

export abstract class UserPersona {
  protected readonly navigation: NavigationAction;
  protected readonly loginAction: LoginAction;

  constructor(protected readonly page: Page, protected readonly user: User) {
    this.navigation = new NavigationAction(page);
    this.loginAction = new LoginAction(page, user);
  }

  async launchApplication(): Promise<void> {
      await test.step('The application is loaded.', async () => {
      await this.navigation.loadApp();
    });
  }

  async login(): Promise<void> {
    await test.step(`logging in user ${this.user.username}`, async () => {
      await this.loginAction.login();
    });
  }

}
