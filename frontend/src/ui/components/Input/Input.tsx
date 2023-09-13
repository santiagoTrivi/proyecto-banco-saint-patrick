import React from 'react';
import { InputStyles } from './Input.styles';

type Props = React.ComponentPropsWithRef<'input'>;

export const Input = React.forwardRef(function Input(
	props: Props,
	ref: Props['ref']
) {
	return (
		<input
			{...props}
			ref={ref}
			className={InputStyles({
				class: props.className
			})}
		/>
	);
}) as (props: Props) => React.ReactElement;
