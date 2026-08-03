// user-behavior/login.behavior.ts
import { Page, test } from '@playwright/test';
import { LoginComponent } from '../UiComponents/Login.comp';
import { DashMemberInfoCard } from '../UiComponents/DashMemberInfoCard.comp';
import { User } from '../model/User';


export class LoginAction {
  constructor(private page: Page, private user: User) {}

  async login() : Promise<void> {
    await test.step('Username and password entered and button clicked.', async () => {
      const loginComponent = new LoginComponent(this.page);
      await loginComponent.username.fill(this.user.username);
      await loginComponent.password.fill(this.user.password);
      await loginComponent.loginBtn.click();

    });
    
  }


}