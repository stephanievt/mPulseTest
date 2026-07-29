import { Locator, Page } from "@playwright/test";

export class PageBannerComponent {
    private readonly banner: Locator;


    constructor(private readonly page: Page) {
    this.banner = page.getByRole('banner');
  }

}
