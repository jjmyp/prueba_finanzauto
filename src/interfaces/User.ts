export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    picture: string;
}


export interface UserDetail {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    picture: string;
    gender: string;
    dateOfBirth: string;
    phone: string;
    location: {
        street: string;
        city: string;
        state: string;
        country: string;
        timezone: string;
    };
}
