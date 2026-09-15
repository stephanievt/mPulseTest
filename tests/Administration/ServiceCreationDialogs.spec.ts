import test, { expect } from '@playwright/test';
import dotenv from 'dotenv';
import { getEnv } from '../env';
import { User } from '../../DataModel/User';
import { Given, When, Then } from '../../Framework/Gherkin';


import { DashboardQuestion } from '../../DomainServices/Member/MemberDashboard.Domain';
import { NavigationDomain } from '../../DomainServices/Navigation.Domain';
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
  const navigationActions = new NavigationDomain(page, getEnv('QA_ORG_MEMBER_URL'));
  await navigationActions.loadApp();
});