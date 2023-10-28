import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

import { useAuthStore, useAuthenticatedStore } from '@/auth/state';
import { MovementFilterControl } from '@/movements/components';
import {
	MovementFilter,
	MovementType,
	MovementsRepository
} from '@/movements/domain';
import { MovementsNestRepository } from '@/movements/services';
import { transactionsQueryKeys } from '@/movements/utils';
import {
	Layout,
	LoaderResource,
	PaginationFilter,
	Skeleton
} from '@/shared/components';
import { Pagination } from '@/shared/domain';
import { forInRange, timeFormatter, webRoutes } from '@/shared/utils';
import { Button, Heading, Text } from '@/ui/components';

interface MovementsPageProps {
	movementsRepository?: MovementsRepository;
}

export function MovementsPage({
	movementsRepository = MovementsNestRepository()
}: MovementsPageProps) {
	const { user, card } = useAuthenticatedStore();
	const cardList = user.cardList;
	const changeCard = useAuthStore((state) => state.changeCard);
	const [pagination, setPagination] = React.useState(Pagination.default());
	const [movementFilter, setMovementFilter] = React.useState(
		MovementFilter.default()
	);
	const movementsContainerRef = React.useRef<HTMLOListElement | null>(null);

	const { data: movementSearch, isLoading: isLoadingMovements } = useQuery(
		transactionsQueryKeys.findTransactions({
			cardId: card.id,
			pagination,
			movementFilter
		}),
		() =>
			movementsRepository.findMovements(card.id, {
				pagination,
				movementFilter
			})
	);

	const movementSearchIsEmpty = !movementSearch?.items.length;
	const hidePagination = !isLoadingMovements && !movementSearch?.items.length;

	function scrollToMovements() {
		movementsContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
	}

	function handleChangePage(page: number) {
		Promise.resolve(setPagination((s) => s.change({ page }))).then(
			scrollToMovements
		);
	}

	function handleChangeLimit(limit: number) {
		Promise.resolve(setPagination(Pagination.default().change({ limit }))).then(
			scrollToMovements
		);
	}

	return (
		<Layout>
			<div className="my-8 flex flex-col">
				<Heading size="2xl" className="mb-8">
					Movements
				</Heading>

				<div className="mb-8 grid gap-4 ">
					<Button
						component="a"
						colorScheme="secondary"
						to={webRoutes.movements.new.absolute}
						className="flex items-center justify-center gap-2 px-8 md:row-start-2 md:w-max"
					>
						Movement <AiOutlinePlus />
					</Button>

					<MovementFilterControl
						className="mb-8 flex flex-col gap-4 sm:grid-cols-4 md:col-span-2 md:grid md:gap-8"
						cardList={cardList}
						cardId={card.id}
						from={movementFilter.from}
						until={movementFilter.until}
						onChangeCard={changeCard}
						onChangeFrom={(v) =>
							setMovementFilter((s) => s.change({ from: v }))
						}
						onChangeUntil={(v) =>
							setMovementFilter((s) => s.change({ until: v }))
						}
					/>

					<PaginationFilter
						className={clsx(
							'mx-auto flex items-center gap-x-4 md:row-start-2 md:ml-auto md:mr-0',
							{ hidden: hidePagination }
						)}
						onChangePage={handleChangePage}
						onChangeLimit={handleChangeLimit}
						currentPage={pagination.page}
						limit={pagination.limit}
						pages={movementSearch?.totalPages}
					/>
				</div>

				<LoaderResource
					isLoading={isLoadingMovements}
					isEmpty={movementSearchIsEmpty}
					empty={
						<div className="flex flex-col items-center justify-center gap-4 rounded border border-primary-300/30 p-8">
							<Heading size="lg">No movements found</Heading>
							<Text className="text-center text-primary-300">
								There are no movements for the selected card.
							</Text>
						</div>
					}
					skeleton={
						<div className="grid grid-cols-[repeat(auto-fill,minmax(min(20rem,100%),1fr))] gap-4 lg:grid-cols-[repeat(auto-fill,minmax(min(24rem,100%),1fr))]">
							{forInRange(10).map((i) => (
								<Skeleton key={i} className=" h-[257px] md:h-[302px]" />
							))}
						</div>
					}
					result={
						<main
							ref={movementsContainerRef}
							id="movements-container"
							className="grid grid-cols-[repeat(auto-fill,minmax(min(20rem,100%),1fr))] gap-4 lg:grid-cols-[repeat(auto-fill,minmax(min(24rem,100%),1fr))]"
						>
							<ol className="contents">
								{movementSearch?.items?.map((movement) => (
									<li key={movement.id} className="contents">
										<Text
											component="div"
											className="flex flex-col rounded border border-primary-300/30 text-primary"
										>
											<div className="border-b border-primary-300/30 px-4 py-2">
												<Heading className="text-primary-300">
													{movement.type}
												</Heading>
											</div>

											<div className="flex flex-1 flex-col px-4 text-center">
												<Text fontSize="xl" className="py-3 text-secondary">
													{movement.amount.format()}
												</Text>

												<Text className="py-2 text-secondary">
													{timeFormatter(movement.createdAt).format(
														'DD/MM/YYYY - HH:mm:ss'
													)}
												</Text>

												<hr className="-mx-4 border-primary-300/30" />

												<Text className="flex min-h-[4rem] flex-1 items-center justify-center text-secondary">
													{movement.concept}
												</Text>

												{movement.type === MovementType.TRANSFERENCE && (
													<>
														<hr className="-mx-4 border-primary-300/30" />
														<Text className="py-2 text-secondary">
															To card: {movement.toCardId}
														</Text>
													</>
												)}

												<hr className="-mx-4 border-primary-300/30" />

												<Text className="py-2 text-secondary">
													Nº: {movement.id}
												</Text>
											</div>
										</Text>
									</li>
								))}
							</ol>
						</main>
					}
				/>

				<PaginationFilter
					className={clsx(
						'mx-auto mt-8 flex items-center gap-x-4 md:ml-auto md:mr-0',
						{ hidden: hidePagination }
					)}
					onChangePage={handleChangePage}
					onChangeLimit={handleChangeLimit}
					currentPage={pagination.page}
					limit={pagination.limit}
					pages={movementSearch?.totalPages}
				/>
			</div>
		</Layout>
	);
}
