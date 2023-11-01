import { Bubble } from '@/shared/components';
import { Heading } from '@/ui/components';
import React from 'react';

type Props = {
	children: React.ReactNode;
};

export function PublicLayout({ children }: Props) {
	return (
		<div className="my-16 flex flex-1 flex-col">
			<Bubble className="fixed -left-5 -top-12 h-32 w-32" />
			<Bubble className="fixed -bottom-12 -right-5 h-44 w-44" />

			<main className="mx-auto flex flex-1 flex-col justify-center">
				<div className="relative mb-8 flex max-w-[300px] flex-col items-center text-center">
					<Bubble className="-top-12 right-10 h-24 w-24 rounded-full" />

					<img src="/logo.png" alt="logo" className="w-28  rounded-md" />

					<Heading component="h2" size="2xl">
						Saint Patrick Bank
					</Heading>
				</div>

				{children}
			</main>
		</div>
	);
}
