import { Page } from '@playwright/test';
import { User } from '../model/User';
import { UserPersona } from './User.persona';

export class MemberPersona extends UserPersona {
  constructor(page: Page, user: User) {
    super(page, user);
  }
}