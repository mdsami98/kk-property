export interface User {
    id: number;
    uuid: string;
    first_name: string;
    last_name: string;
    email: string;
    role: number;
    is_super_admin: number;
}

export interface AuthInterface {
    user: Partial<User> | null;
    isAuthenticated?: boolean;
}

export interface AuthStateInterface {
    auth: AuthInterface;
}
