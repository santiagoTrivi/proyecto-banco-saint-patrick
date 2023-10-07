export interface TokenProps {
	accessToken: string;
	refreshToken: string;
}

export class Token implements TokenProps {
	accessToken: string;
	refreshToken: string;

	constructor(token: TokenProps) {
		this.accessToken = token.accessToken;
		this.refreshToken = token.refreshToken;
	}

	static create(token: Token): Token {
		return new Token(token);
	}
}
