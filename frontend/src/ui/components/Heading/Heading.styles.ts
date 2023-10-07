import { tv, VariantProps } from 'tailwind-variants';

export const HeadingStyles = tv({
	base: 'font-font1 uppercase font-bold text-primary-50',
	variants: {
		size: {
			xs: 'text-sm',
			sm: 'text-base',
			md: 'text-lg',
			lg: 'text-xl',
			xl: 'text-2xl',
			'2xl': 'text-3xl',
			'3xl': 'text-4xl',
			'4xl': 'text-5xl'
		}
	},
	defaultVariants: {
		size: 'md'
	}
});

export type HeadingStyleProps = VariantProps<typeof HeadingStyles>;
