import React from 'react';
import { TextStyles, TextVariants } from './Text.styles';

type Tag = 'span' | 'p' | 'div' | 'button' | 'a';

type Props<T extends Tag = 'span'> = {
	component?: 'span' | T;
} & TextVariants &
	React.ComponentProps<T>;

export const Text = React.forwardRef(function Text<T extends Tag>(
	{ component, fontSize, className, ...props }: Props<T>,
	ref: Props<T>['ref']
) {
	const Tag = component ? (component as T) : 'p';

	return (
		<Tag
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			{...(props as any)}
			ref={ref}
			className={TextStyles({
				fontSize,
				className
			})}
		/>
	);
}) as <T extends Tag>(props: Props<T>) => React.ReactElement;
