import { timeFormatter } from '@/shared/utils';
import { userStub1 } from '@/tests/users';
import { UserCard } from '@/users/components';
import { render, screen } from '@testing-library/react';

describe('<UserCard />', () => {
	it('should render the initials of the user', () => {
		// GIVEN
		render(<UserCard user={userStub1} />);

		// WHEN
		const element = screen.getByText(userStub1.nameInitials());

		// THEN
		expect(element).toBeInTheDocument();
	});

	it('should render the name of the user', () => {
		// GIVEN
		render(<UserCard user={userStub1} />);

		// WHEN
		const element = screen.getByText(`Name: ${userStub1.fullName}`);

		// THEN
		expect(element).toBeInTheDocument();
	});

	it('should render the code of the user', () => {
		// GIVEN
		render(<UserCard user={userStub1} />);

		// WHEN
		const element = screen.getByText(`Code: ${userStub1.id}`);

		// THEN
		expect(element).toBeInTheDocument();
	});

	it('should render the registration date of the user', () => {
		// GIVEN
		render(<UserCard user={userStub1} />);

		// WHEN
		const element = screen.getByText(
			`Registered: ${timeFormatter(userStub1.createdAt).format('DD/MM/YYYY')}`
		);

		// THEN
		expect(element).toBeInTheDocument();
	});
});
