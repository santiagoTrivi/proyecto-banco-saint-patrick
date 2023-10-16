import React from 'react';
import { SelectStyles, SelectVariants } from './Select.styles';

export type SelectProps = SelectVariants & React.ComponentProps<'select'>;

export const Select = React.forwardRef(
	(
		{ className, variant, colorSheme, ...props }: SelectProps,
		ref: SelectProps['ref']
	) => {
		return (
			<select
				{...props}
				ref={ref}
				className={SelectStyles({
					variant,
					colorSheme,
					className
				})}
			/>
		);
	}
);
