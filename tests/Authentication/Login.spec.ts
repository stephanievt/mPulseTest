import test, { expect } from '@playwright/test';
import dotenv from 'dotenv';
import { getEnv } from '../env';
import { User } from '../../DataModel/User';
import { Given, When, Then } from '../../Framework/Gherkin';


import { DashboardQuestion } from '../../DomainServices/Dashboard.Domain';
import { NavigationAction } from '../../DomainServices/Navigation.Domain';
import { LoginAction } from '../../DomainServices/Login.Domain';

dotenv.config({ path: '.env.qa' });

const testUser : User = {
  username: 'hjones2',
  password: getEnv('QA_MEMBER_PASSWORD'),
  firstName: 'Harry',
  lastName: 'Jones',
  role: 'member',
  memberNumber: '8888888800-RP',
};


test.beforeEach(async ({ page }) => {
  const navigationActions = new NavigationAction(page, getEnv('QA_ORG_MEMBER_URL'));
  await navigationActions.loadApp();
});

test('Member login with valid credentials', async ({ page }) => {
  const dashboardQuestions = new DashboardQuestion(page);
  const loginActions = new LoginAction(page, testUser);


  await When('The user logs in with valid credentials', () => loginActions.Login());
  await Then('The user sees their information on the dashboard', async () => {
  expect(await dashboardQuestions.doesMembersInfoCardContainName(testUser)).toBe(true);
  expect(await dashboardQuestions.doesMemberInfoCardContainMemberNumber(testUser)).toBe(true);  

  });
  

  
});

