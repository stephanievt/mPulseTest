import { Page } from '@playwright/test';
import { ProviderSearchPageComponent } from '../UiModel/ProviderSearchPage.comp';
import type { ProviderSearchCriteria } from '../DataModel/ProviderSearchCriteria.ts';
import { narrate } from '../Framework/Gherkin';

export class ProviderDirectoryDomain {
  constructor(private readonly page: Page) {}

  async searchProvider(searchCriteria: ProviderSearchCriteria): Promise<void> {
    await narrate(`Searched using zip code ${searchCriteria.zipCode} within ${searchCriteria.distanceMiles} miles.`);
    const providerSearchPage = new ProviderSearchPageComponent(this.page);
    switch (searchCriteria.locationSearchType) {
        case 'noPreference':
              await providerSearchPage.noPreferenceRadio.check();
              break;  
        case 'within':
            await providerSearchPage.withinRadio.check();
            //TODO: You are building and testing, do not miss this.
            await providerSearchPage.distanceMilesSelect.selectOption(searchCriteria.distanceMiles);
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

  async getSearchResultsProviderNames(): Promise<string[]> {
    const providerSearchPage = new ProviderSearchPageComponent(this.page);
    const pageOneNames =  await providerSearchPage.getSearchResultsProviderNamesFirstPage();
    await narrate(`Retrieved provider names from the first page: ${pageOneNames.join(', ')}`);
    return pageOneNames;
  }

  // Walks every results page, accumulating unique provider names. Use isProviderNamePresent
  // instead when you only need a yes/no answer, since it can stop as soon as a match is found.
  async getAllSearchResultsProviderNames(maxPages = 50): Promise<string[]> {
    const providerSearchPage = new ProviderSearchPageComponent(this.page);
    const allNames = new Set<string>();

    for (let page = 0; page < maxPages; page++) {
      const pageNames = await providerSearchPage.getSearchResultsProviderNamesFirstPage();
      pageNames.forEach((name) => allNames.add(name));

      const hasNextPage = await providerSearchPage.goToNextResultsPage();
      if (!hasNextPage) {
        break;
      }
    }

    return [...allNames];
  }

  async isProviderNamePresent(providerName: string, maxPages = 50): Promise<boolean> {
    const providerSearchPage = new ProviderSearchPageComponent(this.page);

    for (let page = 0; page < maxPages; page++) {
      const pageNames = await providerSearchPage.getSearchResultsProviderNamesFirstPage();
      if (pageNames.some((name) => name.includes(providerName))) {
        return true;
      }

      const hasNextPage = await providerSearchPage.goToNextResultsPage();
      if (!hasNextPage) {
        return false;
      }
    }

    return false;
  }
}