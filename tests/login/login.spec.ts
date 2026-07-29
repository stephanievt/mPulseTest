import { expect } from '@playwright/test';
import { test } from '../../src/fixtures/fixtures';
import dotenv from 'dotenv';
import { getEnv } from '../env';
import { User } from '../../src/model/User';
import {MemberPersona} from '../../src/persona/Member.persona';


dotenv.config({ path: '.env.qa' });
const testUser : User = {
  username: 'hjones2',
  password: getEnv('QA_MEMBER_PASSWORD'),
  firstName: 'Harry',
  lastName: 'Jones',
  role: 'member'
}



test('Login with valid credentials', async ({ page }) => {
  
  const memberPersona = new MemberPersona(page, testUser);
  await memberPersona.launchApplication();
  await memberPersona.login();




  await test.step('Then the user is welcomed on the dashboard', async () => {
    await expect(page).toHaveTitle('Member Portal | BrandHealth');
  });
});

