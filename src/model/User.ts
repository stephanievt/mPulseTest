export type UserRole = 'admin' | 'super user' | 'member' | 'provider';
export interface User{
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    role: UserRole;   
}

