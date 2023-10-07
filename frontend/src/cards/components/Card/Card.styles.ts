import { tv } from 'tailwind-variants';

export const CardStyles = tv({
	base: 'relative flex flex-col overflow-hidden rounded bg-gradient-to-r from-tertiary-800/50 to-tertiary-600/50 p-3 text-primary-50 before:absolute before:-top-12 before:left-52 before:h-full before:w-full before:rotate-[60deg] before:rounded before:bg-secondary-600 before:shadow-lg after:absolute after:-bottom-16 after:-right-52 after:h-full after:w-full after:-rotate-[60deg] after:rounded after:bg-secondary-600 after:shadow-lg'
});
