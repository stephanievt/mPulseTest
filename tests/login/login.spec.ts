import test, { expect } from '@playwright/test';
import dotenv from 'dotenv';
import { getEnv } from '../env';
import { User } from '../../src/model/User';
import { Given, When, Then } from '../../src/utils/gherkin';
import { LoginAction } from '../../src/actions/Login.action';
import { NavigationAction } from '../../src/actions/Navigation.action';

dotenv.config({ path: '.env.qa' });

const testUser : User = {
  username: 'hjones2',
  password: getEnv('QA_MEMBER_PASSWORD'),
  firstName: 'Harry',
  lastName: 'Jones',
  role: 'member'
  }


test('Login with valid credentials', async ({ page }) => {
  
  const navigationAction = new NavigationAction(page);
  const loginAction = new LoginAction(page, testUser);
  await Given('the application is launched', () => navigationAction.loadApp());
  
  await When('the user logs in with valid credentials', () => loginAction.login());

  await test.step('Then the user is welcomed on the dashboard', async () => {
    await expect(page).toHaveTitle('Member Portal | BrandHealth');
  });

  
});

