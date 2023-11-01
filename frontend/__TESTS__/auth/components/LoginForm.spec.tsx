import { fireEvent, render, screen } from '@testing-library/react';

import { LoginForm } from '@/auth/components';
import { AuthStubRepository, credentialStub1 } from '@/auth/services';
import { authTestId } from '@/auth/utils';
import { AppWrapper } from '@/tests/utils';

describe('<LoginForm />', () => {
	it('should login the user', async () => {
		// GIVEN
		render(<LoginForm authRepository={AuthStubRepository()} />, {
			wrapper: AppWrapper()
		});
		const cardNumberInput = screen.getByPlaceholderText(/Credit card number/i);
		const pinInput = screen.getByPlaceholderText(/Enter your password/i);
		const submitButton = screen.getByRole('button', { name: /Login/i });

		// WHEN
		fireEvent.change(cardNumberInput, {
			target: { value: credentialStub1.username }
		});
		fireEvent.blur(cardNumberInput);

		fireEvent.change(pinInput, { target: { value: credentialStub1.password } });
		fireEvent.blur(pinInput);

		expect(
			await screen.findByRole('button', { name: /Login/i })
		).not.toBeDisabled();

		fireEvent.click(submitButton);

		// THEN
		expect(await screen.findByRole('alert')).toHaveTextContent(
			/Login successful/i
		);
	});

	it('should display an error message if the user enters an invalid card number', async () => {
		// GIVEN
		render(<LoginForm authRepository={AuthStubRepository()} />, {
			wrapper: AppWrapper()
		});

		const cardNumberInput = screen.getByPlaceholderText(/Credit card number/i);

		// WHEN
		fireEvent.change(cardNumberInput, { target: { value: '123' } });
		fireEvent.blur(cardNumberInput);

		// THEN
		expect(
			await screen.findByTestId(authTestId.cardNumberError)
		).toBeInTheDocument();
	});

	it('should display an error message if the user enters an invalid PIN', async () => {
		// GIVEN
		render(<LoginForm authRepository={AuthStubRepository()} />, {
			wrapper: AppWrapper()
		});

		const pinInput = screen.getByPlaceholderText(/Enter your password/i);

		// WHEN
		fireEvent.change(pinInput, { target: { value: '123' } });
		fireEvent.blur(pinInput);

		// THEN
		expect(await screen.findByTestId(authTestId.pinError)).toBeInTheDocument();
	});

	it('should disable the submit button if the form is invalid', async () => {
		// GIVEN
		render(<LoginForm authRepository={AuthStubRepository()} />, {
			wrapper: AppWrapper()
		});

		const cardNumberInput = screen.getByPlaceholderText(/Credit card number/i);
		const pinInput = screen.getByPlaceholderText(/Enter your password/i);
		const submitButton = screen.getByRole('button', { name: /Login/i });

		// WHEN
		fireEvent.change(cardNumberInput, { target: { value: '123' } });
		fireEvent.blur(cardNumberInput);
		fireEvent.change(pinInput, { target: { value: '123' } });
		fireEvent.blur(pinInput);

		// THEN
		expect(submitButton).toBeDisabled();
	});
});
