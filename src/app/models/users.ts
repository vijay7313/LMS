export interface User {
    id: number;    
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    email: string;
    mobileNo: number;    
    role?: string;
    domain: string;
}