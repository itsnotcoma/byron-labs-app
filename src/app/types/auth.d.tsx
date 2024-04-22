export type User = {
    id: string;
    username: string;
    name: string;
    email: string;
    company: string;
};

export interface AuthUser extends User {
    access_token: string;
}

export type LoginDTO = {
    username: string;
    password: string;
};
