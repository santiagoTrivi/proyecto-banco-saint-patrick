import { VariantProps, tv } from 'tailwind-variants';

export const ButtonStyles = tv({
	base: 'inline-flex items-center justify-center gap-2 rounded-md px-2 py-1 text-center font-semibold transition-all hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50',
	variants: {
		colorScheme: {
			primary: '',
			secondary: '',
			tertiary: ''
		},

		size: {
			xs: 'text-sm',
			sm: 'text-base',
			md: 'text-lg',
			lg: 'text-xl',
			xl: 'text-2xl'
		},

		variant: {
			outline: '',
			solid: '',
			ghost: '',
			link: 'no-underline hover:underline hover:shadow-none'
		}
	},
	compoundVariants: [
		{
			colorScheme: 'primary',
			variant: 'outline',
			className:
				'border border-primary-400 text-primary-500 hover:bg-primary-500/20'
		},
		{
			colorScheme: 'secondary',
			variant: 'outline',
			className:
				'border border-secondary-500 text-secondary-400 hover:bg-secondary-500/20'
		},
		{
			colorScheme: 'tertiary',
			variant: 'outline',
			className:
				'border border-tertiary-500 text-tertiary-400 hover:bg-tertiary-500/20'
		},
		{
			colorScheme: 'primary',
			variant: 'solid',
			className: 'bg-primary-400 text-primary-900 hover:bg-primary-500'
		},
		{
			colorScheme: 'secondary',
			variant: 'solid',
			className: 'bg-secondary-400 text-secondary-900 hover:bg-secondary-500'
		},
		{
			colorScheme: 'tertiary',
			variant: 'solid',
			className: 'bg-tertiary-400 text-tertiary-900 hover:bg-tertiary-500'
		},
		{
			colorScheme: 'primary',
			variant: 'ghost',
			className: 'text-primary-400 hover:bg-primary-500/20'
		},
		{
			colorScheme: 'secondary',
			variant: 'ghost',
			className: 'text-secondary-400 hover:bg-secondary-500/20'
		},
		{
			colorScheme: 'tertiary',
			variant: 'ghost',
			className: 'text-tertiary-400 hover:bg-tertiary-500/20'
		},
		{
			colorScheme: 'primary',
			variant: 'link',
			className: 'text-primary-400'
		},
		{
			colorScheme: 'secondary',
			variant: 'link',
			className: 'text-secondary-400'
		},
		{
			colorScheme: 'tertiary',
			variant: 'link',
			className: 'text-tertiary-400'
		}
	],
	defaultVariants: {
		colorScheme: 'primary',
		size: 'sm',
		variant: 'solid'
	}
});

export type ButtonVariants = VariantProps<typeof ButtonStyles>;
