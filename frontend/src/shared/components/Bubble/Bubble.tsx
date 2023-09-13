import { BubbleStyles } from './Bubble.styles';

type Props = {
	className?: string;
};
export const Bubble = ({ className }: Props) => {
	return <div className={BubbleStyles({ class: className })} />;
};
