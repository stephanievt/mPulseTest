import { Locator, Page } from "@playwright/test";

export class DashMemberInfoCard {
    
    public readonly memberInfoCard: Locator; // This is the Div that contains the stuff on the member info card
    public readonly memberInfoCardHeader: Locator; // This is the welcome message of the header card.
    public readonly memberInfoCardMemberNumber: Locator; // This is the member number on the card.    

    constructor(private readonly page: Page) {
        this.memberInfoCard = page.locator('div.cc-home-memberinfo');
        this.memberInfoCardHeader = this.memberInfoCard.getByRole('heading', { level: 1 });
        this.memberInfoCardMemberNumber = this.memberInfoCard.getByRole('heading', { level: 2 });
    }

}