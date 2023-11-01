export interface UserCreateProps {
	firstName: string;
	lastName: string;
	username: string;
	password: string;
}

export class UserCreate {
	firstName: string;
	lastName: string;
	username: string;
	password: string;

	constructor(props: UserCreateProps) {
		this.firstName = props.firstName;
		this.lastName = props.lastName;
		this.username = props.username;
		this.password = props.password;
	}

	static create(props: UserCreateProps): UserCreate {
		return new UserCreate(props);
	}
}
