import { User } from '@/users/domain';
import { Credentials } from './credentials.model';
import { Token } from './token.model';

export interface AuthRepository {
	login: (credentials: Credentials) => Promise<Token>;
	logout: (accessToken: string) => Promise<void>;
	refreshSession: () => Promise<Token>;
	clientInfo: () => Promise<User>;
}
