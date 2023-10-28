import { forInRange } from '@/shared/utils';
import { Button, Select } from '@/ui/components';
import React from 'react';

type Props = {
	onChangePage: (criteria: number) => void;
	onChangeLimit: (criteria: number) => void;
	pages?: number;
	limit: number;
	currentPage: number;
	className?: string;
};

export const PaginationFilter = ({
	onChangePage,
	onChangeLimit,
	pages,
	limit,
	currentPage,
	className
}: Props) => {
	const pagesRef = React.useRef(pages || 0);
	pagesRef.current = pages ?? pagesRef.current;
	const _pages = pagesRef.current;

	const prevIsDisabled = currentPage === 1;
	const nextIsDisabled = currentPage === _pages;

	function handlePreviousPage() {
		onChangePage(currentPage - 1);
	}

	function handleNextPage() {
		onChangePage(currentPage + 1);
	}

	function handleChangedLimit(e: React.ChangeEvent<HTMLSelectElement>) {
		onChangeLimit(parseInt(e.target.value) || 10);
	}

	function handleChangedPage(e: React.ChangeEvent<HTMLSelectElement>) {
		onChangePage(parseInt(e.target.value) || 1);
	}

	return (
		<div className={className} data-testid="pagination-filter">
			<Button disabled={prevIsDisabled} onClick={handlePreviousPage}>
				Previous
			</Button>

			<Select
				onChange={handleChangedPage}
				value={currentPage}
				title="Page"
				id="page"
				name="page"
			>
				<option value="">Page</option>
				{forInRange(_pages).map((page) => (
					<option key={page} value={page}>
						{page}
					</option>
				))}
			</Select>

			<Select
				id="limit"
				name="limit"
				onChange={handleChangedLimit}
				title="Items limit"
				value={limit}
			>
				<option value="">Items limit</option>
				<option value={5}>5</option>
				<option value={10}>10</option>
				<option value={15}>15</option>
			</Select>

			<Button disabled={nextIsDisabled} onClick={handleNextPage}>
				Next
			</Button>
		</div>
	);
};
