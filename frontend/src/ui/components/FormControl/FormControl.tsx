import React from 'react';

import { FormControlStyles } from './FormControlStyles';

type Props = React.HTMLAttributes<HTMLDivElement>;

export const FormControl = (props: Props) => {
	return (
		<div
			{...props}
			className={FormControlStyles({
				class: props.className
			})}
		/>
	);
};
