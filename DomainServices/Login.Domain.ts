// user-behavior/login.behavior.ts

import test, { Page } from '@playwright/test';
import { LoginComponent } from '../UiModel/Login.comp';
import { User } from '../DataModel/User';


export class LoginAction {
  constructor(private page: Page, private user: User) { }

  async Login(): Promise<void> {
    await test.step('Username and password entered and button clicked.', async () => {
      const loginComponent = new LoginComponent(this.page);
      await loginComponent.username.fill(this.user.username);
      await loginComponent.password.fill(this.user.password);
      await loginComponent.loginBtn.click();

    });

  }

  async ForgotLink(): Promise<void> {
    await test.step('Forgot link clicked.', async () => {
      const loginComponent = new LoginComponent(this.page);
      await loginComponent.forgotPasswordLink.click();
    });
  }


}


