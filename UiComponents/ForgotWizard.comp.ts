
import type { Locator, Page } from '@playwright/test';

// This is a class for the "pages" of the forgot user name and password wizard sequence.
export class ForgotWizardComponent {
    // Forgot service v4 has an extra click as the first "page" of the wizard is a button.
    public readonly ForgotButtonV4: Locator;
    public readonly SsnTextbox: Locator;
    public readonly FirstNameTextbox: Locator;
    public readonly LastNameTextbox: Locator;
    public readonly DateOfBirthMTestbox: Locator;
    public readonly NextButton: Locator;
    public readonly CancelButton: Locator;

    constructor(page: Page) {
        this.ForgotButtonV4 = page.getByRole('button').locator('#btnSmart');
        this.SsnTextbox = page.getByRole('textbox').locator('#ssn');
        this.FirstNameTextbox = page.getByRole('textbox').locator('#ul_firstName');
        this.LastNameTextbox = page.getByRole('textbox').locator('#ul_lastName');
        this.DateOfBirthMTestbox = page.getByRole('textbox').locator('#ul_dob');
        this.NextButton = page.getByRole('button').locator('#ul_next');
        this.CancelButton = page.getByRole('button').locator('#ul_cancel');
    }
}