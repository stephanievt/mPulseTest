import { Locator, Page } from "@playwright/test";
import { step } from "../../utils/step";

export class LoginComponent {
  private readonly username: Locator;
  private readonly password: Locator;
  private readonly loginBtn: Locator;

  constructor(private readonly page: Page) {
    this.username = page.getByRole('textbox').and(page.locator('#username'))
    this.password = page.getByRole("textbox").and(page.locator('#password'));
    this.loginBtn = page.getByRole("button").and(page.locator('#loginButton'));
  }

   

  @step()
  async login(user: string, pass: string) {
    await this.username.fill(user);
    await this.password.fill(pass);
    await this.loginBtn.click();
  }
}