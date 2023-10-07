import { Appbar } from '@/shared/components';
import React from 'react';

type Props = {
	children: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
	return (
		<div>
			<Appbar />

			<div className="mx-auto flex max-w-7xl flex-col max-[1280px]:px-4">
				{children}
			</div>
		</div>
	);
};
