import { tv } from 'tailwind-variants';

export const UserCardStyles = tv({
	slots: {
		userCard: 'text-primary bg-primary-100/10 p-4 rounded',
		userCardInitials:
			'aspect-square w-16 bg-secondary-400/20 rounded-full flex flex-col justify-center items-center m-auto mb-4',
		userCardName: 'capitalize'
	}
});
