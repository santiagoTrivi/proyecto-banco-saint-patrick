import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { RegisterForm } from '@/auth/components';
import { AuthStubRepository } from '@/auth/services';
import { CurrenciesStubRepository } from '@/currencies/services';
import { sessionStorageRepository } from '@/shared/services';
import { AppWrapper } from '@/tests/utils';

describe('<RegisterForm />', () => {
	it('should register an user successfully', async () => {
		// GIVEN
		render(
			<RegisterForm
				authRepository={AuthStubRepository()}
				currenciesRepository={CurrenciesStubRepository()}
				storageRepository={sessionStorageRepository}
			/>,
			{ wrapper: AppWrapper() }
		);
		const firstNameInput = screen.getByPlaceholderText(/first name/i);
		const lastNameInput = screen.getByPlaceholderText(/last name/i);
		const usernameInput = screen.getByPlaceholderText(/username/i);
		const passwordInput = screen.getByPlaceholderText('Password');
		const confirmPasswordInput =
			screen.getByPlaceholderText(/confirm password/i);
		const currencyInput = screen.getByPlaceholderText(/currency/i);
		const pinInput = screen.getByPlaceholderText(/pin/i);

		// WHEN
		fireEvent.change(firstNameInput, { target: { value: 'John' } });
		fireEvent.blur(firstNameInput);
		fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
		fireEvent.blur(lastNameInput);
		fireEvent.change(usernameInput, { target: { value: 'johndoe' } });
		fireEvent.blur(usernameInput);
		fireEvent.change(passwordInput, { target: { value: 'password' } });
		fireEvent.blur(passwordInput);
		fireEvent.change(confirmPasswordInput, { target: { value: 'password' } });
		fireEvent.blur(confirmPasswordInput);

		await waitFor(async () => {
			expect(await screen.findByText(/dolar/i)).toBeInTheDocument();
		});

		fireEvent.change(currencyInput, { target: { value: '1' } });
		fireEvent.blur(currencyInput);
		fireEvent.change(pinInput, { target: { value: '1234' } });
		fireEvent.blur(pinInput);

		await waitFor(() => {
			expect(firstNameInput).toHaveValue('John');
			expect(lastNameInput).toHaveValue('Doe');
			expect(usernameInput).toHaveValue('johndoe');
			expect(passwordInput).toHaveValue('password');
			expect(confirmPasswordInput).toHaveValue('password');
			expect(currencyInput).toHaveValue('1');
			expect(pinInput).toHaveValue('1234');
		});

		const submitButton = screen.getByRole('button', { name: /register/i });

		await waitFor(() => {
			expect(submitButton).not.toBeDisabled();
		});

		fireEvent.click(submitButton);

		// THEN
		expect(
			await screen.findByText(/you have been registered successfully/i)
		).toBeInTheDocument();
	});

	it('should show an error if first name is empty', async () => {
		// GIVEN
		render(
			<RegisterForm
				authRepository={AuthStubRepository()}
				currenciesRepository={CurrenciesStubRepository()}
				storageRepository={sessionStorageRepository}
			/>,
			{ wrapper: AppWrapper() }
		);
		const firstNameInput = screen.getByPlaceholderText(/first name/i);

		// WHEN
		fireEvent.change(firstNameInput, { target: { value: '' } });
		fireEvent.blur(firstNameInput);

		// THEN
		expect(
			await screen.findByText(/first name cannot be empty/i)
		).toBeInTheDocument();
	});

	it('should show an error if last name is empty', async () => {
		// GIVEN
		render(
			<RegisterForm
				authRepository={AuthStubRepository()}
				currenciesRepository={CurrenciesStubRepository()}
				storageRepository={sessionStorageRepository}
			/>,
			{ wrapper: AppWrapper() }
		);
		const lastNameInput = screen.getByPlaceholderText(/last name/i);

		// WHEN
		fireEvent.change(lastNameInput, { target: { value: '' } });
		fireEvent.blur(lastNameInput);

		// THEN
		expect(
			await screen.findByText(/last name cannot be empty/i)
		).toBeInTheDocument();
	});

	it('should show an error if username is empty', async () => {
		// GIVEN
		render(
			<RegisterForm
				authRepository={AuthStubRepository()}
				currenciesRepository={CurrenciesStubRepository()}
				storageRepository={sessionStorageRepository}
			/>,
			{ wrapper: AppWrapper() }
		);
		const usernameInput = screen.getByPlaceholderText(/username/i);

		// WHEN
		fireEvent.change(usernameInput, { target: { value: '' } });
		fireEvent.blur(usernameInput);

		// THEN
		expect(
			await screen.findByText(/username cannot be empty/i)
		).toBeInTheDocument();
	});

	it('should show an error if username is less than 4 characters', async () => {
		// GIVEN
		render(
			<RegisterForm
				authRepository={AuthStubRepository()}
				currenciesRepository={CurrenciesStubRepository()}
				storageRepository={sessionStorageRepository}
			/>,
			{ wrapper: AppWrapper() }
		);

		const usernameInput = screen.getByPlaceholderText(/username/i);

		// WHEN
		fireEvent.change(usernameInput, { target: { value: 'abc' } });
		fireEvent.blur(usernameInput);

		// THEN
		expect(
			await screen.findByText(
				/Username must be between 4 and 20 characters long/i
			)
		).toBeInTheDocument();
	});

	it('should show an error if username is more than 20 characters', async () => {
		// GIVEN
		render(
			<RegisterForm
				authRepository={AuthStubRepository()}
				currenciesRepository={CurrenciesStubRepository()}
				storageRepository={sessionStorageRepository}
			/>,
			{ wrapper: AppWrapper() }
		);

		const usernameInput = screen.getByPlaceholderText(/username/i);

		// WHEN
		fireEvent.change(usernameInput, {
			target: { value: 'thisusernameistoooooolong' }
		});
		fireEvent.blur(usernameInput);

		// THEN
		expect(
			await screen.findByText(
				/Username must be between 4 and 20 characters long/i
			)
		).toBeInTheDocument();
	});

	it('should show an error if password is less than 8 characters', async () => {
		// GIVEN
		render(
			<RegisterForm
				authRepository={AuthStubRepository()}
				currenciesRepository={CurrenciesStubRepository()}
				storageRepository={sessionStorageRepository}
			/>,
			{ wrapper: AppWrapper() }
		);
		const passwordInput = screen.getByPlaceholderText('Password');

		// WHEN
		fireEvent.change(passwordInput, { target: { value: 'abcdefg' } });
		fireEvent.blur(passwordInput);

		// THEN
		expect(
			await screen.findByText(
				/Password must be between 8 and 50 characters long/i
			)
		).toBeInTheDocument();
	});

	it('should show an error if password is more than 50 characters', async () => {
		// GIVEN
		render(
			<RegisterForm
				authRepository={AuthStubRepository()}
				currenciesRepository={CurrenciesStubRepository()}
				storageRepository={sessionStorageRepository}
			/>,
			{ wrapper: AppWrapper() }
		);
		const passwordInput = screen.getByPlaceholderText('Password');

		// WHEN
		fireEvent.change(passwordInput, {
			target: {
				value: 'thispasswordistoooooooooooooooooooooooooooooooolong'
			}
		});
		fireEvent.blur(passwordInput);

		// THEN
		expect(
			await screen.findByText(
				/Password must be between 8 and 50 characters long/i
			)
		).toBeInTheDocument();
	});

	it("should show an error if confirm password doesn't match", async () => {
		// GIVEN
		render(
			<RegisterForm
				authRepository={AuthStubRepository()}
				currenciesRepository={CurrenciesStubRepository()}
				storageRepository={sessionStorageRepository}
			/>,
			{ wrapper: AppWrapper() }
		);
		const passwordInput = screen.getByPlaceholderText('Password');
		const confirmPasswordInput =
			screen.getByPlaceholderText(/confirm password/i);

		// WHEN
		fireEvent.change(passwordInput, { target: { value: 'password' } });
		fireEvent.blur(passwordInput);
		fireEvent.change(confirmPasswordInput, {
			target: { value: 'anotherpassword' }
		});
		fireEvent.blur(confirmPasswordInput);

		// THEN
		expect(
			await screen.findByText(/passwords must match/i)
		).toBeInTheDocument();
	});

	it('should show an error if currency is empty', async () => {
		// GIVEN
		render(
			<RegisterForm
				authRepository={AuthStubRepository()}
				storageRepository={sessionStorageRepository}
			/>,
			{ wrapper: AppWrapper() }
		);
		const currencyInput = screen.getByPlaceholderText(/currency/i);

		// WHEN
		fireEvent.change(currencyInput, { target: { value: '' } });
		fireEvent.blur(currencyInput);

		// THEN
		expect(
			await screen.findByText(/currency must be selected/i)
		).toBeInTheDocument();
	});

	it('should show an error if PIN is empty', async () => {
		// GIVEN
		render(
			<RegisterForm
				authRepository={AuthStubRepository()}
				storageRepository={sessionStorageRepository}
			/>,
			{ wrapper: AppWrapper() }
		);
		const pinInput = screen.getByPlaceholderText(/pin/i);

		// WHEN
		fireEvent.change(pinInput, { target: { value: '' } });
		fireEvent.blur(pinInput);

		// THEN
		expect(
			await screen.findByText(/PIN must be exactly 4 characters long/i)
		).toBeInTheDocument();
	});
});
