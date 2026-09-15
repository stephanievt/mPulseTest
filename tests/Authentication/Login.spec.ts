import test, { expect } from '@playwright/test';
import dotenv from 'dotenv';
import { getEnv } from '../env';
import { User } from '../../DataModel/User';
import { Given, When, Then, Feature } from '../../Framework/Gherkin';
import { UserJonesOnBrandHealth } from '../../DataTestInstance/UserJonesOnBrandHealth';

import { DashboardQuestion } from '../../DomainServices/Member/MemberDashboard.Domain';
import { NavigationDomain } from '../../DomainServices/Navigation.Domain';
import { LoginAction } from '../../DomainServices/Login.Domain';

dotenv.config({ path: '.env.qa' });


const testUser : User = UserJonesOnBrandHealth; 

Feature(
    'Member Login',
    'Tests login to MEMBER portal.',
    __filename,
    () => {


test.beforeEach(async ({ page }) => {
  const navigationActions = new NavigationDomain(page, getEnv('BRANDHEALTH_ORG_URL'));
  await navigationActions.loadApp();
});

test('Member login with valid credentials', async ({ page }, testInfo) => {
  
  // Necessary declarations.
  const dashboardQuestions = new DashboardQuestion(page);
  const loginActions = new LoginAction(page, testUser);

  await testInfo.attach('Test description', {
            body: 'Verifies that a member can log in with valid credentials and see their information on the dashboard.',
            contentType: 'text/markdown',
        });

  await When('The user logs in with valid credentials', () => loginActions.Login());
  await Then('The user sees their information on the dashboard', async () => {
  expect(await dashboardQuestions.doesMembersInfoCardContainName(testUser)).toBe(true);
  expect(await dashboardQuestions.doesMemberInfoCardContainMemberNumber(testUser)).toBe(true);  

  });
  

  
});

});