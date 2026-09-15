import { Locator, Page } from "@playwright/test";
import { Organization } from '../../DataModel/OrganizationModel';

interface Menu {
    Menu: Locator;
    SubMenu: Locator[];
}

export class AdminMainComponent {

    readonly Menus: Menu[] = [];
    

    constructor(page: Page, organization: Organization) {

        organization.Menu.forEach((menuItem) => {
            const menuLocator: Locator = page.locator(`a:has-text("${menuItem.Menu}")`);
            const subMenuLocators: Locator[] = menuItem.SubMenu.map(subMenuItem => page.locator(`a:has-text("${subMenuItem}")`));
            this.Menus.push({
                Menu: menuLocator,
                SubMenu: subMenuLocators
            });
        });
    }
}