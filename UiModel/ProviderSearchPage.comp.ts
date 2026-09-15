import { Locator, Page } from '@playwright/test';

export class ProviderSearchPageComponent {
	public readonly providerButton: Locator;
	public readonly facilityButton: Locator;
	public readonly locationHeading: Locator;
	public readonly noPreferenceRadio: Locator;
	public readonly withinRadio: Locator;
	public readonly onlyInsideRadio: Locator;
	public readonly distanceMilesSelect: Locator;
	public readonly zipCodeInput: Locator;
	public readonly useCurrentLocationCheckbox: Locator;
	public readonly cityInput: Locator;
	public readonly stateSelect: Locator;
	public readonly addressInput: Locator;
	public readonly countySelect: Locator;
    public readonly findProviderButton: Locator;
	public readonly resultsPagination: Locator;

	constructor(private readonly page: Page) {
		this.providerButton = page.getByRole('button', { name: 'Provider', exact: true });
		this.facilityButton = page.getByRole('button', { name: 'Facility', exact: true });
		this.locationHeading = page.getByRole('heading', { name: 'By Location', exact: true });
		this.noPreferenceRadio = page.getByRole('radio', { name: 'No preference', exact: true });
		this.withinRadio = page.getByRole('radio', { name: 'Within', exact: true });
		this.onlyInsideRadio = page.getByRole('radio', { name: 'Only inside', exact: true });
		this.distanceMilesSelect = page.getByRole('combobox').first(); // LOC: This is a bad locator given by AI
		this.zipCodeInput = page.locator('#practitionerZip');
		this.useCurrentLocationCheckbox = page.getByRole('checkbox', {
			name: 'Use current location',
			exact: true,
		});
		this.cityInput = page.getByRole('textbox', { name: 'City', exact: true });
		this.stateSelect = page.getByRole('combobox', { name: 'State', exact: true });
		this.addressInput = page.getByRole('textbox', { name: 'Address', exact: true });
		this.countySelect = page.getByRole('combobox', { name: 'County', exact: true });
		this.findProviderButton = page.locator("#submitProvSearch");
		this.resultsPagination = page.locator('ul#resultsPagination');
	}

	public async getSearchResultsProviderNamesFirstPage(): Promise<string[]> {
		const resultLinks = this.page.locator('ul#resultsList a.detailsLink');
		await resultLinks.first().waitFor({ state: 'visible' });
		return await resultLinks.allInnerTexts();
	}

	public async goToNextResultsPage(): Promise<boolean> {
		// The current page renders as a plain #currentPage input, not a link; other pages are <a>N</a> links.
		const currentPageLocator = this.resultsPagination.locator('#currentPage');
		currentPageLocator.highlight();
		const currentPage = Number(await currentPageLocator.inputValue());
		
		const nextPageNumber = currentPage + 1;

		// Page links have no accessible name, just the page number as their text content.
		const nextPageLink = this.resultsPagination.locator('a').filter({ hasText: new RegExp(`^${nextPageNumber}$`) });
		if ((await nextPageLink.count()) === 0) {
			return false; // no link for currentPage + 1 means we're on the last page
		}

		await nextPageLink.click();
		await this.page.waitForFunction(
			(expectedPage) => document.querySelector<HTMLInputElement>('#currentPage')?.value === expectedPage,
			String(nextPageNumber)
		);
		await this.page.locator('ul#resultsList a.detailsLink').first().waitFor({ state: 'visible' });
		return true;
	}
}
