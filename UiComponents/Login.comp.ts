import { Locator, Page } from "@playwright/test";

export class LoginComponent {
  public readonly username: Locator;
  public readonly password: Locator;
  public readonly loginBtn: Locator;

  constructor(private readonly page: Page) {
    this.username = page.getByRole('textbox').and(page.locator('#username'))
    this.password = page.getByRole("textbox").and(page.locator('#password'));
    this.loginBtn = page.getByRole("button").and(page.locator('#loginButton'));
  }

   

}