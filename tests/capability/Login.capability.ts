// user-behavior/login.behavior.ts
import { Page } from '@playwright/test';
import { LoginComponent } from '../UiComponents/Login.comp';
import { DashMemberInfoCard } from '../UiComponents/DashMemberInfoCard.comp';
import { User } from '../pojo/user';

export class LoginBehavior {
  constructor(private page: Page, private user: User) {}

  async loginAs(user: { username: string; password: string; firstName?: string; lastName?: string }) {
    const loginComponent = new LoginComponent(this.page);
    await loginComponent.login(user.username, user.password);
  }

  async expectDashboardWelcome(firstName: string, lastName: string) {
    const dashMemberInfoCard = new DashMemberInfoCard(this.page);
    await dashMemberInfoCard.memberInfoCardHeader.waitFor({ state: 'visible' });
  }
}