import { Page } from '@playwright/test';
import { ProviderSearchPageComponent } from '../UiComponents/ProviderSearchPage.comp.ts';
import type { ProviderSearchCriteria } from '../DataModel/ProviderSearchCriteria.ts';

export class ProviderDirectoryDomain {
  constructor(private readonly page: Page) {}

  async searchProvider(searchCriteria: ProviderSearchCriteria): Promise<void> {
    const providerSearchPage = new ProviderSearchPageComponent(this.page);
    switch (searchCriteria.locationSearchType) {
        case 'noPreference':
              providerSearchPage.noPreferenceRadio.check();
              break;  
        case 'within':
            providerSearchPage.withinRadio.check();
            //TODO: You are building and testing, do not miss this.
            providerSearchPage.distanceMilesSelect.selectOption('10 Miles');
            if (searchCriteria.zipCode === undefined) {
                //TODO: This is the first sample to make thinking about
                // distinguishing framework errors from application errors.
                throw new Error('Zip code is required for a within location search');
            }
            providerSearchPage.zipCodeInput.fill(searchCriteria.zipCode);
            break;
        case 'onlyInside':
            providerSearchPage.onlyInsideRadio.check();
            if (searchCriteria.zipCode === undefined) {
                //TODO: This is the second sample to make thinking about
                // distinguishing framework errors from application errors.
                throw new Error('Zip code is required for an only inside location search');
            }
            providerSearchPage.zipCodeInput.fill(searchCriteria.zipCode);

            break;
          
        default:
            throw new Error(`Unsupported location search type: ${searchCriteria.locationSearchType}`);
      }

    await providerSearchPage.findProviderButton.click();

  }
}