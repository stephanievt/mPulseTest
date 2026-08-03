import { Locator, Page } from "@playwright/test";
import { User } from "../model/User";

export class DashMemberInfoCard {
    
    public readonly memberInfoCard: Locator; // This is the Div that contains the stuff on the member info card
    public readonly memberInfoCardHeader: Locator; // This is the welcome message of the header card.

    constructor(private readonly page: Page, private readonly user?: User) {
        this.memberInfoCard = page.locator('div.cc-home-memberinfo');
        this.memberInfoCardHeader = this.memberInfoCard.locator('h1');
    }

}