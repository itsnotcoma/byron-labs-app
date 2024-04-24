export type User = {
    id: string;
    username: string;
    name: string;
    email: string;
    company: string;
};

export type AuthError = {
    error: {
        status: string;
        message: string;
    };
};

export type AuthUser = User & {
    expires: Date & string;
    access_token: string;
    error?: AuthError;
};

export type LoginDTO = {
    username: string;
    password: string;
};
