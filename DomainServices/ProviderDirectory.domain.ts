import { Page } from '@playwright/test';
import { ProviderSearchPageComponent } from '../UiComponents/ProviderSearchPage.comp';
import type { ProviderSearchCriteria } from '../DataModel/ProviderSearchCriteria.ts';

export class ProviderDirectoryDomain {
  constructor(private readonly page: Page) {}

  async searchProvider(searchCriteria: ProviderSearchCriteria): Promise<void> {
    const providerSearchPage = new ProviderSearchPageComponent(this.page);
    switch (searchCriteria.locationSearchType) {
        case 'noPreference':
              await providerSearchPage.noPreferenceRadio.check();
              break;  
        case 'within':
            await providerSearchPage.withinRadio.check();
            //TODO: You are building and testing, do not miss this.
            await providerSearchPage.distanceMilesSelect.selectOption('10 Miles');
            if (searchCriteria.zipCode === undefined) {
                //TODO: This is the first sample to make thinking about
                // distinguishing framework errors from application errors.
                throw new Error('Zip code is required for a within location search');
            }
            await providerSearchPage.zipCodeInput.fill(searchCriteria.zipCode);
            break;
        case 'onlyInside':
            await providerSearchPage.onlyInsideRadio.check();
            if (searchCriteria.zipCode === undefined) {
                //TODO: This is the second sample to make thinking about
                // distinguishing framework errors from application errors.
                throw new Error('Zip code is required for an only inside location search');
            }
            await providerSearchPage.zipCodeInput.fill(searchCriteria.zipCode);

            break;
          
        default:
            throw new Error(`Unsupported location search type: ${searchCriteria.locationSearchType}`);
      }

    await providerSearchPage.findProviderButton.click();

  }
}