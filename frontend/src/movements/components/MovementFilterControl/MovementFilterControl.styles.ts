import { tv } from 'tailwind-variants';

export const MovementFilterControlStyles = tv({
	slots: {
		base: 'rounded border border-tertiary-400/30 p-4',
		legend: 'px-2 font-bold text-tertiary-100',
		label: 'text-tertiary-500'
	}
});
