export interface CredentialsProps {
	username: string;
	password: string;
}

export class Credentials implements CredentialsProps {
	username: string;
	password: string;

	constructor(credentials: CredentialsProps) {
		this.username = credentials.username;
		this.password = credentials.password;
	}

	static create(credentials: Credentials): Credentials {
		return new Credentials(credentials);
	}
}
