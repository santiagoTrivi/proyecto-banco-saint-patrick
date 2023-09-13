import React from 'react';
import { Link } from 'react-router-dom';

import { ButtonStyles, ButtonVariants } from './Button.styles';

type Tag = 'button' | 'a';

type ButtonProps<T extends Tag> = {
	children?: React.ReactNode;
	component?: T;
} & ButtonVariants &
	(T extends 'a' ? Parameters<typeof Link>['0'] : React.ComponentProps<T>);

export const Button = React.forwardRef(function Button<T extends Tag>(
	{
		children,
		colorScheme,
		className,
		size,
		variant,
		component,
		...props
	}: ButtonProps<T>,
	ref: ButtonProps<T>['ref']
) {
	const Tag = component === 'a' ? Link : component || 'button';

	return (
		<Tag
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			{...(props as any)}
			className={ButtonStyles({
				colorScheme,
				variant,
				size,
				className
			})}
			ref={ref}
		>
			{children}
		</Tag>
	);
}) as <T extends Tag>(props: ButtonProps<T>) => React.ReactElement<T>;
