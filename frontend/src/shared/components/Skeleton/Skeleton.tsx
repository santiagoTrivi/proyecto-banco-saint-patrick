import { tv } from 'tailwind-variants';

type Props = {
	className?: string;
};

const SkeletonStyles = tv({
	base: 'min-h-[1rem] min-w-[1rem] animate-pulse rounded bg-gray-300 dark:bg-gray-700'
});

export function Skeleton({ className }: Props) {
	return <div className={SkeletonStyles({ className })} />;
}
