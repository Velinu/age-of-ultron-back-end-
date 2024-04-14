export interface User {
    _id: string;
    username: string;
    weight: number;
    password: string;
    email: string;
    refreshToken?: string;
    canLogin: boolean;
    active: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}