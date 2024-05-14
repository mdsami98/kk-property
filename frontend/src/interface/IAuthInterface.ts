import { User } from './IUserInterface';

export interface AuthInterface {
    user: Partial<User> | null;
    isAuthenticated?: boolean;
}

export interface AuthStateInterface {
    auth: AuthInterface;
}
