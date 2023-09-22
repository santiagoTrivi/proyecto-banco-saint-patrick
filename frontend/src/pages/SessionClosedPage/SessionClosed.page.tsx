import { webRoutes } from '@/shared/utils';
import { Button } from '@/ui/components';

export const SessionClosedPage = () => {
	return (
		<div className="flex flex-col min-h-screen min-w-full items-center justify-center text-primary">
			<div className="text-4xl font-bold p-8">Session closed</div>
			<Button>
				<a href={webRoutes.auth.login.absolute}>Go to login</a>
			</Button>
		</div>
	);
};
