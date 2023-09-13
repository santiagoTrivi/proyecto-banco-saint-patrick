import React from 'react';

import { HeadingStyleProps, HeadingStyles } from './Heading.styles';

type Tag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type Props<T extends Tag = 'h1'> = {
	component?: 'h1' | T;
} & HeadingStyleProps &
	React.ComponentPropsWithRef<T>;

export const Heading = React.forwardRef(function Heading<T extends Tag>(
	{ size, component, className, ...props }: Props<T>,
	ref: Props<T>['ref']
) {
	const Component = component ? (component as T) : 'h1';

	return (
		<Component
			{...props}
			className={HeadingStyles({
				className,
				size
			})}
			ref={ref}
		/>
	);
}) as <T extends Tag>(props: Props<T>) => React.ReactElement;
