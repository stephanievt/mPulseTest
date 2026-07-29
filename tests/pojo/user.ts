export class User{
    username: string | undefined;
    password: string | undefined;
    email: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;

    constructor(username: string, password: string, email: string, firstName: string, lastName: string){
        this.username = username;
        this.password = password;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
    }

}

