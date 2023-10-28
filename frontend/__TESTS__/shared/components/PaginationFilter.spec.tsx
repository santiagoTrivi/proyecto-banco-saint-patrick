import { PaginationFilter } from '@/shared/components';
import { fireEvent, render, screen } from '@testing-library/react';

describe('<PaginationFilter />', () => {
	it('should change to the next page', () => {
		// GIVEN
		const onChangePage = vi.fn();
		render(
			<PaginationFilter
				currentPage={1}
				pages={10}
				onChangeLimit={vi.fn()}
				onChangePage={onChangePage}
				limit={10}
			/>
		);

		// WHEN
		const nextButton = screen.getByRole('button', { name: /next/i });
		fireEvent.click(nextButton);

		// THEN
		expect(onChangePage).toBeCalledTimes(1);
		expect(onChangePage).toHaveBeenCalledWith(2);
	});

	it('should change to the previous page', () => {
		// GIVEN
		const onChangePage = vi.fn();
		render(
			<PaginationFilter
				currentPage={2}
				pages={10}
				onChangeLimit={vi.fn()}
				onChangePage={onChangePage}
				limit={10}
			/>
		);

		// WHEN
		const prevButton = screen.getByRole('button', { name: /previous/i });
		fireEvent.click(prevButton);

		// THEN
		expect(onChangePage).toBeCalledTimes(1);
		expect(onChangePage).toHaveBeenCalledWith(1);
	});

	it('should change the page with the select', () => {
		// GIVEN
		const onChangePage = vi.fn();
		render(
			<PaginationFilter
				currentPage={1}
				pages={10}
				onChangeLimit={vi.fn()}
				onChangePage={onChangePage}
				limit={10}
			/>
		);

		// WHEN
		const pageSelect = screen.getByRole('combobox', { name: /Page/i });
		fireEvent.change(pageSelect, { target: { value: 2 } });

		// THEN
		expect(onChangePage).toBeCalledTimes(1);
		expect(onChangePage).toHaveBeenCalledWith(2);
	});

	it('should change the limit', async () => {
		// GIVEN
		const onChangeLimit = vi.fn();
		render(
			<PaginationFilter
				currentPage={1}
				pages={10}
				onChangeLimit={onChangeLimit}
				onChangePage={vi.fn()}
				limit={10}
			/>
		);

		// WHEN
		const limitSelect = screen.getByRole('combobox', {
			name: /Items limit/i
		});
		fireEvent.change(limitSelect, { target: { value: 5 } });

		// THEN
		expect(onChangeLimit).toBeCalledTimes(1);
		expect(onChangeLimit).toHaveBeenCalledWith(5);
	});
});
