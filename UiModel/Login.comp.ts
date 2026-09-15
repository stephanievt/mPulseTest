import { Locator, Page } from "@playwright/test";

export class LoginComponent {
  public readonly username: Locator;
  public readonly password: Locator;
  public readonly loginBtn: Locator;
  public readonly forgotPasswordLink: Locator;
  public readonly providerDirectory: Locator;

  constructor(private readonly page: Page) {
    this.username = page.getByRole('textbox').and(page.locator('#username'))
    this.password = page.getByRole("textbox").and(page.locator('#password'));
    this.loginBtn = page.getByRole("button").and(page.locator('#loginButton'));
    this.forgotPasswordLink = page.getByRole("link").and(page.locator('#forgotLink'));
    //TODO: This is an example of a questionable locator. This is customizable. IMO this link should have a data-test-id.
    this.providerDirectory = page.locator('a').getByText('here')
  }



   

}