import { Heading, Text } from '@/ui/components';
import * as DialogPrimitives from '@radix-ui/react-dialog';
import clsx from 'clsx';
import React from 'react';

type Props = {
	trigger: React.ReactNode;
	title?: string | React.ReactElement;
	body?: string | React.ReactElement;
	className?: string;
};

export const Dialog = ({ trigger, title, body, className }: Props) => {
	return (
		<DialogPrimitives.Root>
			<DialogPrimitives.Trigger asChild>{trigger}</DialogPrimitives.Trigger>
			<DialogPrimitives.Portal>
				<DialogPrimitives.Overlay className="fixed inset-0 animate-overlayShow bg-bg1-900/70" />

				<DialogPrimitives.Content
					className={clsx(
						'fixed left-1/2 top-1/2 min-w-[15rem] -translate-x-1/2 -translate-y-1/2 animate-contentShow',
						className
					)}
				>
					<div className="relative rounded-md border border-bg1-300/50 bg-bg1">
						{title && (
							<DialogPrimitives.Title
								asChild
								className="rounded-t-[inherit] bg-primary-300 px-4 py-2 pr-10"
							>
								{typeof title === 'string' ? (
									<Heading size="md" className="text-primary-900">
										{title}
									</Heading>
								) : (
									<>{title}</>
								)}
							</DialogPrimitives.Title>
						)}

						<DialogPrimitives.Description asChild>
							{typeof body === 'string' ? (
								<Text component="p" className="text-primary">
									{body}
								</Text>
							) : (
								body
							)}
						</DialogPrimitives.Description>
						<DialogPrimitives.Close className="absolute right-2 top-2">
							✖️
						</DialogPrimitives.Close>
					</div>
				</DialogPrimitives.Content>
			</DialogPrimitives.Portal>
		</DialogPrimitives.Root>
	);
};
