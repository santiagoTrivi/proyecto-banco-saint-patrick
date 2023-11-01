import { PublicLayout, RegisterForm } from '@/auth/components';

export function RegisterPage() {
	return (
		<PublicLayout>
			<RegisterForm className="flex w-full max-w-xs flex-col gap-y-4" />
		</PublicLayout>
	);
}
