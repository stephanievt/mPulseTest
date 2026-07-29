import { Page } from "@playwright/test";
import { PageManager } from "../../../pages/PageManager";

export interface QuoteCompanyInfo {
  brokerId: string;
  groupName: string;
  zipCode: string;
  effectiveDate: string;
  sicCode: string;
}

export interface QuoteMemberInfo {
  birthDate: string;
  zipCode: string;
}

export interface QuoteProductLines {
  medical?: boolean;
  life?: boolean;
  vision?: boolean;
  dental?: boolean;
  chiropractic?: boolean;
}

export interface QuotePackages {
  medical?: boolean;
  dental?: boolean;
  vision?: boolean;
  chiropractic?: boolean;
  assurityLife?: boolean;
}

export interface QuoteFlowOptions {
  companyInfo: QuoteCompanyInfo;
  members: QuoteMemberInfo[];
  productLines: QuoteProductLines;
  packages: QuotePackages;
  lifePlanIndex: number;
}

export class QuoteFlowHelper {
  constructor(private readonly page: Page) {}

  async completeQuoteFlow(options: QuoteFlowOptions): Promise<void> {
    const { companyInfo, members, productLines, packages, lifePlanIndex } = options;
    const app = new PageManager(this.page);

    await app.carrierUserDashboard.navigationBar.clickNewQuote();

    // Group Proposal Company Step
    await app.groupProposalCompanyStep.clickAddBrokerOfRecord();
    await app.groupProposalCompanyStep.searchBroker({ brokerId: companyInfo.brokerId });
    await app.groupProposalCompanyStep.selectBrokerFromSearchResults();
    await app.groupProposalCompanyStep.fillGroupName(companyInfo.groupName);
    await app.groupProposalCompanyStep.fillZipCode(companyInfo.zipCode);
    await app.groupProposalCompanyStep.fillEffectiveDate(companyInfo.effectiveDate);
    await app.groupProposalCompanyStep.fillSicCode(companyInfo.sicCode);
    await app.groupProposalCompanyStep.clickNext();

    // Group Proposal Members Step
    await app.groupProposalMembersStep.fillMemberBirthDateInRow(1, members[0].birthDate);
    await app.groupProposalMembersStep.fillMemberZipCodeInRow(1, members[0].zipCode);

    for (let i = 1; i < members.length; i++) {
      await app.groupProposalMembersStep.clickAddEmployee();
      await app.groupProposalMembersStep.fillMemberBirthDateInRow(i + 1, members[i].birthDate);
      await app.groupProposalMembersStep.fillMemberZipCodeInRow(i + 1, members[i].zipCode);
    }

    await app.groupProposalMembersStep.clickNext();

    // Product Line Step
    if (productLines.medical) await app.groupProposalProductLineStep.selectMedical();
    if (productLines.life) await app.groupProposalProductLineStep.selectLife();
    if (productLines.vision) await app.groupProposalProductLineStep.selectVision();
    if (productLines.dental) await app.groupProposalProductLineStep.selectDental();
    if (productLines.chiropractic) await app.groupProposalProductLineStep.selectChiropractic();
    await app.groupProposalProductLineStep.clickNext();

    // Package Step
    if (packages.medical) await app.groupProposalPackageStep.selectMedicalPackage();
    if (packages.dental) await app.groupProposalPackageStep.selectDentalVoluntary();
    if (packages.vision) await app.groupProposalPackageStep.selectVisionPackage();
    if (packages.chiropractic) await app.groupProposalPackageStep.selectChiropracticPackage();
    if (packages.assurityLife) await app.groupProposalPackageStep.selectAssurityLife();
    await app.groupProposalPackageStep.clickNext();

    // Program Choices Step
    await app.groupProposalProgramChoicesStep.clickPcTab();
    await app.groupProposalProgramChoicesStep.checkPcContributionLowestCostPlan();
    await app.groupProposalProgramChoicesStep.clickChiroPcTab();
    await app.groupProposalProgramChoicesStep.clickNext();

    // Life Plan Selection Step
    await app.groupProposalLifePlanSelectionStep.selectPlan(lifePlanIndex);
    await app.groupProposalLifePlanSelectionStep.clickNext();
  }
}
