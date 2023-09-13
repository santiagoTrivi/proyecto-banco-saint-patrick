import React from 'react';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';

import { Card as CardModel } from '@/cards/domain';
import { groupChars } from '@/shared/utils';
import { Button, Text } from '@/ui/components';

type Props = {
	card: CardModel;
};

export const Card = ({ card }: Props) => {
	const [showBalance, setShowBalance] = React.useState(false);

	return (
		<div className="max-w-md flex flex-col bg-gradient-to-r from-tertiary-800/50 to-tertiary-600/50 p-3 m-4 overflow-hidden text-primary-50 rounded relative before:bg-secondary-600 before:rounded before:absolute before:-top-12 before:left-52 before:w-full before:h-full before:rotate-[60deg] before:shadow-lg after:bg-secondary-600 after:rounded after:absolute after:-bottom-16 after:-right-52 after:w-full after:h-full after:-rotate-[60deg] after:shadow-lg">
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

					<Button variant="outline" colorScheme="tertiary">
						Movements
					</Button>
				</div>

				<img src="/chip-logo.png" alt="chip" className="w-16 mr-auto mt-4" />

				<Text component="div" className="tracking-widest mx-auto mt-4 mb-8">
					{groupChars(card.cardNumber, 4)}
				</Text>

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
