import { VariantProps, tv } from 'tailwind-variants';

export const SelectStyles = tv({
	base: 'text-md px-2 py-1 font-font1 font-medium outline-none transition-all duration-150',

	variants: {
		colorSheme: {
			primary: '',
			secondary: '',
			tertiary: ''
		},
		variant: {
			outline: 'rounded-md border-2 bg-neutral-50/0 text-primary-50',
			filled: 'rounded-t-md border-b-2 text-primary-50'
		}
	},
	compoundVariants: [
		{
			colorSheme: 'primary',
			variant: 'outline',
			className:
				'border-primary-100/50 hover:border-primary-100 focus:border-primary-300'
		},
		{
			colorSheme: 'secondary',
			variant: 'outline',
			className:
				'border-secondary-100/50 hover:border-secondary-100 focus:border-secondary-300'
		},
		{
			colorSheme: 'tertiary',
			variant: 'outline',
			className:
				'border-tertiary-100/50 hover:border-tertiary-100 focus:border-tertiary-300'
		},
		{
			colorSheme: 'primary',
			variant: 'filled',
			className:
				'border-primary-200/50 bg-slate-800 text-primary-100 focus:border-primary-300'
		},
		{
			colorSheme: 'secondary',
			variant: 'filled',
			className:
				'border-secondary-200/50 bg-slate-800 text-secondary-100 focus:border-secondary-300'
		},
		{
			colorSheme: 'tertiary',
			variant: 'filled',
			className:
				'border-tertiary-200/50 bg-slate-800 text-tertiary-100 focus:border-tertiary-300'
		}
	],
	defaultVariants: {
		colorSheme: 'primary',
		variant: 'filled'
	}
});

export type SelectVariants = VariantProps<typeof SelectStyles>;
