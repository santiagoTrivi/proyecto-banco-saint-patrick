import { LabelStyles } from './Label.styles';

type Props = {} & React.LabelHTMLAttributes<HTMLLabelElement>;

export function Label(props: Props) {
	return (
		<label
			{...props}
			className={LabelStyles({
				class: props.className
			})}
		/>
	);
}
