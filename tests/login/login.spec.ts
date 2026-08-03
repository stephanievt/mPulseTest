import test, { expect } from '@playwright/test';
import dotenv from 'dotenv';
import { getEnv } from '../env';
import { User } from '../../src/model/User';
import { Given, When, Then } from '../../src/utils/gherkin';
import { DashboardQuestion } from '../../src/questions/Dashboard.questions';
import { MemberPersona } from '../../src/persona/Member.persona';

dotenv.config({ path: '.env.qa' });

const testUser : User = {
  username: 'hjones2',
  password: getEnv('QA_MEMBER_PASSWORD'),
  firstName: 'Harry',
  lastName: 'Jones',
  role: 'member',
  memberNumber: '8888888800-RP'
};


test('Login with valid credentials', async ({ page }) => {

  const memberPersona = new MemberPersona(page, testUser);
  const dashboardQuestions = new DashboardQuestion(page);

  await Given('the application is launched', () => memberPersona.launchApplication());
  await When('the user logs in with valid credentials', () => memberPersona.login());
  await Then('the user sees their information on the dashboard', async () => {
    await expect(await dashboardQuestions.doesMembersInfoCardContainName(testUser)).toBe(true);
    await expect(await dashboardQuestions.doesMemberInfoCardContainMemberNumber(testUser)).toBe(true);  
  });
  

  
});

