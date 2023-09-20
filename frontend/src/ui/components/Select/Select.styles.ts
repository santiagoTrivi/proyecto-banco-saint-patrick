import { VariantProps, tv } from 'tailwind-variants';

export const SelectStyles = tv({
	base: 'font-nunito px-2 py-1 font-medium text-md outline-none transition-all duration-150',

	variants: {
		colorSheme: {
			primary: '',
			secondary: '',
			tertiary: ''
		},
		variant: {
			outline: 'border-2 bg-neutral-50/0 text-primary-50 rounded-md',
			filled: 'border-b-2 text-primary-50 rounded-t-md'
		}
	},
	compoundVariants: [
		{
			colorSheme: 'primary',
			variant: 'outline',
			className:
				'border-primary-100/50 focus:border-primary-300 hover:border-primary-100'
		},
		{
			colorSheme: 'secondary',
			variant: 'outline',
			className:
				'border-secondary-100/50 focus:border-secondary-300 hover:border-secondary-100'
		},
		{
			colorSheme: 'tertiary',
			variant: 'outline',
			className:
				'border-tertiary-100/50 focus:border-tertiary-300 hover:border-tertiary-100'
		},
		{
			colorSheme: 'primary',
			variant: 'filled',
			className:
				'text-primary-100 bg-slate-800/40 border-primary-200/50 focus:border-primary-300'
		},
		{
			colorSheme: 'secondary',
			variant: 'filled',
			className:
				'text-secondary-100 bg-slate-800/40 border-secondary-200/50 focus:border-secondary-300'
		},
		{
			colorSheme: 'tertiary',
			variant: 'filled',
			className:
				'text-tertiary-100 bg-slate-800/40 border-tertiary-200/50 focus:border-tertiary-300'
		}
	],
	defaultVariants: {
		colorSheme: 'primary',
		variant: 'filled'
	}
});

export type SelectVariants = VariantProps<typeof SelectStyles>;
