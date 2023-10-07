import { envVariables } from '@/shared/utils';
import { Heading } from '@/ui/components';

export const Appbar = () => {
	return (
		<div className="bg-primary-400 py-3">
			<div className="max-w-7xl m-auto max-[1280px]:px-4">
				<Heading className="text-black">{envVariables.APP_NAME}</Heading>
			</div>
		</div>
	);
};
