import test, { expect } from '@playwright/test';
import dotenv from 'dotenv';
import { getEnv } from '../env';
import { User } from '../../DataModel/User';
import { Given, When, Then } from '../../Utils/gherkin';

import { MemberPersona } from '../../Persona/Member.persona';
import { DashboardQuestion } from '../../DomainServices/Dashboard.questions';

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
  //TODO: This is an example where it should a test failure not a timeout.
  expect(await dashboardQuestions.doesMembersInfoCardContainName(testUser)).toBe(true);
  expect(await dashboardQuestions.doesMemberInfoCardContainMemberNumber(testUser)).toBe(true);  

  });
  

  
});

