import { LoginForm } from '@/auth/components/LoginForm';
import { Bubble } from '@/shared/components';
import { Heading } from '@/ui/components';

export const LoginPage = () => {
	return (
		<div className="flex flex-col flex-1">
			<Bubble className="w-32 h-32 -top-12 -left-5 fixed" />
			<Bubble className="w-44 h-44 -bottom-12 -right-5 fixed" />

			<main className="flex flex-col flex-1 justify-center items-center">
				<div className="flex flex-col items-center max-w-[300px] text-center mb-8 relative">
					<Bubble className="w-24 h-24 -top-12 right-10 rounded-full" />

					<img src="/logo.png" alt="logo" className="w-28  rounded-md" />

					<Heading component="h2" size="2xl">
						Saint Patrick Bank
					</Heading>
				</div>

				<LoginForm />
			</main>
		</div>
	);
};
