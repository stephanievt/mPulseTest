import test, { expect } from '@playwright/test';
import dotenv from 'dotenv';
import { getEnv } from '../env';
import { Feature, Given, When, Then, narrate } from '../../Framework/Gherkin';
import { NavigationDomain } from '../../DomainServices/Navigation.Domain';
import { ProviderDirectoryDomain } from '../../DomainServices/ProviderDirectory.domain';
import type { ProviderSearchCriteria } from '../../DataModel/ProviderSearchCriteria';


//Local vars for test.
dotenv.config({ path: '.env.qa' });
const url : string = getEnv('BRANDHEALTH_ORG_URL');



Feature(
    'Provider Directory by Provider Location Tests',
    'Tests of Provider Directory by LOCATION only with no other search criteria for provider or location provided.',
    __filename,
    () => {

    test.beforeEach(async ({ page }) => {
        const navigationActions = new NavigationDomain(page, url);
        await navigationActions.loadApp();
    });



    test('Provider Search by Location for within 10 miles of given zip code', async ({ page }, testInfo) => {
        
        const navigation = new NavigationDomain(page, url);
        const providerDirectory = new ProviderDirectoryDomain(page);
        const searchParams : ProviderSearchCriteria = {
            locationSearchType: 'within',
            distanceMiles: '10 Miles',
            zipCode: '34108',
            useCurrentLocation: false
        };
        const expectedProvider : string = 'VICTORIA RICE';

        
        await testInfo.attach('Test description', {
            body: 'Verifies that a member can search for a provider using a zip code and mileage radius.',
            contentType: 'text/markdown',
        });


        await Given('Navigation to Provider Directory', async () => {
            await navigation.NavigateProviderDirectory();
            
        });

        
        await When('I search for a provider with the specified location information', async () => {
            await providerDirectory.searchProvider(searchParams);
            
        });

        await Then('I should see a list of providers that match the location criteria', async () => {
            const results = await providerDirectory.getSearchResultsProviderNames();
            expect(results.length).toBeGreaterThan(0);
        });

        await Then(`${expectedProvider} should be listed in the search results`, async () => {
            const found = await providerDirectory.isProviderNamePresent(expectedProvider);
            expect(found).toBe(true);
        });

    });
});
