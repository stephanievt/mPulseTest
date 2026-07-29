import { test, expect } from '@playwright/test';
import { LoginBehavior } from '../capability/Login.capability';
import dotenv from 'dotenv';
import { getEnv } from '../env';
import { User } from '../pojo/user';
import { NavigationBehavior } from '../capability/Navigation.capability';

dotenv.config({ path: '.env.qa' });

const testUser = new User('hjones2', getEnv('QA_MEMBER_PASSWORD'), 'stephanie.goulet@mpulse.com', 'Harry', 'Jones' );

test('Login with valid credentials', async ({ page }) => {
  const behavior = new NavigationBehavior(page);
  const loginBehavior = new LoginBehavior(page, testUser);

  await test.step('Given the user is on the login page', async () => {
    await behavior.loadApp();
  });

  await test.step('When the user enters valid credentials', async () => {
    await loginBehavior.loginAs({
      username: 'hjones2',
      password: getEnv('QA_MEMBER_PASSWORD')
    });
  });

  await test.step('Then the user is welcomed on the dashboard', async () => {
    await expect(page).toHaveTitle('Member Portal | BrandHealth');
  });
});

