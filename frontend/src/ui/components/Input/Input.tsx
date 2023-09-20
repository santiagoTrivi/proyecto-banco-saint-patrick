import React from 'react';

import { InputStyles, InputVariants } from './Input.styles';

type Props = InputVariants & React.ComponentPropsWithRef<'input'>;

export const Input = React.forwardRef(function Input(
	{ variant, colorSheme, ...props }: Props,
	ref: Props['ref']
) {
	return (
		<input
			{...props}
			ref={ref}
			className={InputStyles({
				class: props.className,
				variant,
				colorSheme
			})}
		/>
	);
}) as (props: Props) => React.ReactElement;
