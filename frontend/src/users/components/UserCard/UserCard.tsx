import { timeFormatter } from '@/shared/utils';
import { Text } from '@/ui/components';
import { User } from '@/users/domain';
import { UserCardStyles } from './UserCard.styles';

type Props = {
	user: User;
} & React.ComponentProps<'div'>;

export const UserCard = ({ user, className, ...props }: Props) => {
	const styles = UserCardStyles();

	return (
		<Text
			{...props}
			component="div"
			className={styles.userCard({ className })}
			data-testid={UserCard.testId}
		>
			<Text fontSize="xl" className={styles.userCardInitials()}>
				{user.nameInitials()}
			</Text>

			<div className={styles.userCardName()}>Name: {user.fullName}</div>
			<div>Code: {user.id}</div>
			<div>
				Registered: {timeFormatter(user.createdAt).format('DD/MM/YYYY')}
			</div>
		</Text>
	);
};

UserCard.testId = 'user-card';