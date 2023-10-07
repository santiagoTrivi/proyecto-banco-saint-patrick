import { VariantProps, tv } from 'tailwind-variants';

export const TextStyles = tv({
	base: 'font-font1 font-medium tracking-wider',
	variants: {
		fontSize: {
			xs: 'text-sm',
			sm: 'text-base',
			md: 'text-lg',
			lg: 'text-xl',
			xl: 'text-2xl'
		}
	},
	defaultVariants: {
		fontSize: 'md'
	}
});

export type TextVariants = VariantProps<typeof TextStyles>;
