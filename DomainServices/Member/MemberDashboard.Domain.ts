import { Page } from '@playwright/test';
import { DashMemberInfoCard } from '../../UiModel/DashMemberInfoCard.comp';
import { User } from '../../DataModel/User';
import { Question } from '../Question';

export class DashboardQuestion extends Question {
  private readonly card: DashMemberInfoCard;

  constructor(private readonly page: Page) {
    super();
    this.card = new DashMemberInfoCard(page);
  }

  async doesMembersInfoCardContainName(user: User): Promise<boolean> {
    if (!(await this.tryWaitFor(this.card.memberInfoCard))) {
      return false;
    }

    const headerText = (await this.card.memberInfoCardHeader.textContent())?.trim() ?? '';
    const expectedFullName = `${user.firstName} ${user.lastName}`;
    return headerText.toLowerCase().includes(expectedFullName.toLowerCase());
  }

  async doesMemberInfoCardContainMemberNumber(user: User): Promise<boolean> {
    if (!(await this.tryWaitFor(this.card.memberInfoCard))) {
      return false;
    }

    const memberNumberText = (await this.card.memberInfoCardMemberNumber.textContent())?.trim() ?? '';
    return memberNumberText.includes(user.memberNumber);
  }

}

