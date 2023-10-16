import React from 'react';

import { Appbar } from '@/shared/components';

type Props = {
	children: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
	return (
		<>
			<Appbar />

			<div className="mx-auto flex w-full max-w-7xl flex-1 flex-col max-[1280px]:px-4">
				{children}
			</div>
		</>
	);
};
