export type UserRole = 'admin' | 'super user' | 'member' | 'provider';
export interface User{
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    role: UserRole;   
    memberNumber: string; //TODO: This likely needs to go elsewhere in a different model that inherits...
}

