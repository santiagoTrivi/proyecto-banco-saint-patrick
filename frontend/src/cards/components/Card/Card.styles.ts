import { tv } from 'tailwind-variants';

export const CardStyles = tv({
	base: 'flex flex-col bg-gradient-to-r from-tertiary-800/50 to-tertiary-600/50 p-3 overflow-hidden text-primary-50 rounded relative before:bg-secondary-600 before:rounded before:absolute before:-top-12 before:left-52 before:w-full before:h-full before:rotate-[60deg] before:shadow-lg after:bg-secondary-600 after:rounded after:absolute after:-bottom-16 after:-right-52 after:w-full after:h-full after:-rotate-[60deg] after:shadow-lg'
});
