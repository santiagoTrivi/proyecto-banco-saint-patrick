import React from 'react';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';

import { CardStyles } from '@/cards/components/Card/Card.styles';
import { Card as CardModel } from '@/cards/domain';
import { webRoutes } from '@/shared/utils';
import { Button, Text } from '@/ui/components';

type Props = {
	card: CardModel;
	cardSelector: React.ReactNode;
} & React.ComponentProps<'div'>;

export const Card = ({ card, cardSelector, className, ...props }: Props) => {
	const [showBalance, setShowBalance] = React.useState(false);

	return (
		<div
			className={CardStyles({
				className
			})}
			{...props}
		>
			<div className="flex flex-col justify-between z-10">
				<div className="flex justify-between gap-2">
					<div className="flex justify-between">
						<div className="flex justify-center items-center">
							<Text className="mr-2">
								{showBalance ? (
									<span>{card.balanceFormatted}</span>
								) : (
									<span>{card.balanceFormatted.replace(/\d/g, '*')}</span>
								)}
							</Text>

							<Button
								className="flex justify-center items-center gap-2"
								colorScheme="primary"
								size="xs"
								variant="ghost"
								onClick={() => setShowBalance(!showBalance)}
							>
								Show
								{showBalance ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
							</Button>
						</div>
					</div>

					<Button
						component="a"
						to={webRoutes.transactions.new.absolute}
						variant="outline"
						colorScheme="tertiary"
					>
						Movements
					</Button>
				</div>

				<img src="/chip-logo.png" alt="chip" className="w-16 mr-auto mt-4" />

				{cardSelector}

				<div className="flex justify-between">
					<Text fontSize="xs">{card.username}</Text>
					<Text fontSize="xs">
						{card.isActive ? '✅ Active' : '⛔ Inactive'}
					</Text>
				</div>
			</div>
		</div>
	);
};
