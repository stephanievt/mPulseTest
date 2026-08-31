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
	}


}
