export interface Account {
    username: string;
    email: string;
    firstName: string;
    surname: string;
    phoneNumber: string;
    registerDate: string;
    license: string;
    isEnable: boolean;
    isActive: boolean;
    accessLevels: Array<string>;
}