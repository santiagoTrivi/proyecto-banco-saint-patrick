type Props = {
	message?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const ErrorMessagge = ({ message, ...props }: Props) => {
	return (
		<>
			{message && (
				<div {...props} className="text-red-500" role="alert">
					{message}
				</div>
			)}
		</>
	);
};
