export type UserRole = 'admin' | 'super user' | 'member' | 'provider';

export class User {
  username!: string;
  password!: string;
  firstName!: string;
  lastName!: string;
  role!: UserRole;
  memberNumber!: string;
  dobDay!: number;
  dobMonth!: number;
  dobYear!: number;
}





