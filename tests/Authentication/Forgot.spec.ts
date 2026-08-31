import test from "@playwright/test";
import { getEnv } from "../env";
import { User } from "../../DataModel/User";
import { Given, When } from "../../Utils/gherkin";
import { NavigationAction } from "../../DomainServices/Navigation.Domain";
import { LoginAction } from '../../DomainServices/Login.Domain';

const testUser : User = {
  username: 'hjones2',
  password: getEnv('QA_MEMBER_PASSWORD'),
  firstName: 'Harry',
  lastName: 'Jones',
  role: 'member',
  memberNumber: '8888888800-RP'
};

test ('Forgot username or password sequence for singular user match', async ({ page }) => {
  // TODO: Ali does this with a kinda factory ish. PageManager. It is handy for test creators to have a list.
  // But I would think it adds unnecessary memory overhead for tests. All the pages are loaded into the class.
  // This is a topic that is present in the course. Finish that bit, relook at Ali's implementation, and see.
  // For ME, I would prioritize run speed over creation ease, especially if DomainServices are understandable
  // and useful. But I may not understand the purpose yet.
  const navigationActions = new NavigationAction(page); 
  const loginActions = new LoginAction(page, testUser);

  await Given('the application is launched', () => navigationActions.loadApp());
  await When('the user clicks on the forgot password link', async () => {
    await loginActions.ForgotLink();
  });
});