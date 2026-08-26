import { Locator, Page } from "@playwright/test";

export class DashboardComponent {
    private readonly serviceContainer: Locator; // This is the container for everything on the dashboard component

    constructor(private readonly page: Page)
    {
        this.serviceContainer = page.locator('div#myElementId');
        
    }
}