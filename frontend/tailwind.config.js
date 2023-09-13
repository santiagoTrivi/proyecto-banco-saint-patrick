/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		fontFamily: {
			nunito: ['Nunito', 'sans-serif']
		},
		extend: {
			colors: {
				bg1: {
					DEFAULT: '#16172b',
					50: '#edeffb',
					100: '#cccee5',
					200: '#abadd2',
					300: '#8a8cbf',
					400: '#696bac',
					500: '#505194',
					600: '#3d3f73',
					700: '#2c2d52',
					800: '#1a1b33',
					900: '#080815'
				},
				primary: {
					DEFAULT: '#fdd981',
					50: '#fff7de',
					100: '#ffe8b1',
					200: '#fdd981',
					300: '#fcca51',
					400: '#fabb23',
					500: '#e1a10f',
					600: '#b07e07',
					700: '#7e5a02',
					800: '#4b3600',
					900: '#1c1200'
				},
				secondary: {
					DEFAULT: '#38ddc2',
					50: '#dcfef9',
					100: '#b7f6eb',
					200: '#8eedde',
					300: '#64e5d0',
					400: '#3bdec3',
					500: '#21c4a9',
					600: '#139884',
					700: '#056d5e',
					800: '#004238',
					900: '#001813'
				},

				tertiary: {
					DEFAULT: '#00daff',
					50: '#d7feff',
					100: '#aaf5ff',
					200: '#7aeeff',
					300: '#48e5ff',
					400: '#1adeff',
					500: '#00c4e6',
					600: '#0099b4',
					700: '#006d82',
					800: '#004250',
					900: '#00181f'
				}
			}
		}
	},
	plugins: []
};
