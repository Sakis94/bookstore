export class User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    type: number;
    typeName: string;
}

export enum UserType {
    Admin = 1, User = 0
}
