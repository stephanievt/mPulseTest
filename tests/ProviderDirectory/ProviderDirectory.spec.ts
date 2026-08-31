import test, { expect } from '@playwright/test';
import dotenv from 'dotenv';
import { getEnv } from '../env';
import { Given, When, Then } from '../../Utils/gherkin';
import { NavigationAction } from '../../DomainServices/Navigation.Domain';
import type { ProviderSearchCriteria } from '../../DataModel/ProviderSearchCriteria.ts';



//Local vars for test.
dotenv.config({ path: '.env.qa' });
const url : string = getEnv('BRANDHEALTH_ORG_URL');
const searchParams : ProviderSearchCriteria = {
    locationSearchType: 'within',
    distanceMiles: 10,
    zipCode: '34108',
    useCurrentLocation: false
};


test.beforeEach(async ({ page }) => {
    const navigationActions = new NavigationAction(page, url);
    await navigationActions.loadApp();
});


test('Provider Basic', async ({ page }) => {
    const navigationActions = new NavigationAction(page, getEnv('BRANDHEALTH_ORG_URL'));
    await Given('the application is launched', () => navigationActions.loadApp());
});