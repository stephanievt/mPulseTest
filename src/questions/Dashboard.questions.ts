import { Page } from '@playwright/test';
import { DashMemberInfoCard } from '../UiComponents/DashMemberInfoCard.comp';
import { User } from '../model/User';

export class DashboardQuestion{
  private readonly card: DashMemberInfoCard;

  constructor(private readonly page: Page) {
    this.card = new DashMemberInfoCard(page);
  }

  async doesMembersInfoCardContainName(user: User): Promise<boolean> {
    await this.card.memberInfoCard.waitFor({ state: 'visible' });

    const headerText = (await this.card.memberInfoCardHeader.textContent())?.trim() ?? '';
    const expectedFullName = `${user.firstName} ${user.lastName}`;
    return headerText.toLowerCase().includes(expectedFullName.toLowerCase());
  }

  async doesMemberInfoCardContainMemberNumber(user: User): Promise<boolean> {
    await this.card.memberInfoCard.waitFor({ state: 'visible' });

    const memberNumberText = (await this.card.memberInfoCardMemberNumber.textContent())?.trim() ?? '';
    return memberNumberText.includes(user.memberNumber);
  }

}