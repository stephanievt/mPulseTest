import test, { expect } from '@playwright/test';
import dotenv from 'dotenv';
import { getEnv } from '../env';
import { Given, When, Then } from '../../Framework/Gherkin';
import { NavigationAction } from '../../DomainServices/Navigation.Domain';
import { ProviderDirectoryDomain } from '../../DomainServices/ProviderDirectory.domain';


import type { ProviderSearchCriteria } from '../../DataModel/ProviderSearchCriteria';
import { ProviderSearchPageComponent } from '../../UiComponents/ProviderSearchPage.comp';



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


test('Provider Search Location One', async ({ page }) => {
    const navigationActions = new NavigationAction(page, url);
    const providerDirectory = new ProviderDirectoryDomain(page);

    await Given('Navigation to Provider Directory', () => navigationActions.ProviderDirectory());
    
    await When('I search for a provider with the specified location', () =>
        providerDirectory.searchProvider(searchParams)
    );

});