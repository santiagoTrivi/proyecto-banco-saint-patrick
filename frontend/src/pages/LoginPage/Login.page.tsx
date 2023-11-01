import { PublicLayout } from '@/auth/components';
import { LoginForm } from '@/auth/components/LoginForm';

export const LoginPage = () => {
	return (
		<PublicLayout>
			<LoginForm className="flex w-full max-w-[300px] flex-col gap-y-4" />
		</PublicLayout>
	);
};
