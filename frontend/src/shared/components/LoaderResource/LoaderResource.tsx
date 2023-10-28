type Props = {
	result: React.ReactNode;
	skeleton: React.ReactNode;
	empty: React.ReactNode;
	isLoading: boolean;
	isEmpty: boolean;
};

export function LoaderResource({
	result,
	skeleton,
	empty,
	isLoading,
	isEmpty
}: Props) {
	return (
		<>
			{isLoading && skeleton}
			{!isLoading && isEmpty && empty}
			{!isLoading && !isEmpty && result}
		</>
	);
}
