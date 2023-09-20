import { SelectStyles, SelectVariants } from './Select.styles';

export type SelectProps = SelectVariants &
	Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> & {
		onChange: (e: string) => void;
	};

export const Select = ({
	className,
	variant,
	colorSheme,
	onChange,
	...props
}: SelectProps) => {
	return (
		<select
			{...props}
			onChange={(e) => onChange(e.target.value)}
			className={SelectStyles({
				variant,
				colorSheme,
				className
			})}
		/>
	);
};
