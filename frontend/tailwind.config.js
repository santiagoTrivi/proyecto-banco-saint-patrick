/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		fontFamily: {
			nunito: ['Nunito', 'sans-serif'],
			font1: ['Ysabeau Infant', 'sans-serif']
		},
		extend: {
			colors: {
				bg1: {
					DEFAULT: '#080816',
					50: '#ececf8',
					100: '#c8c7e6',
					200: '#a2a2d6',
					300: '#7e7dc7',
					400: '#5b58b9',
					500: '#423ea0',
					600: '#34317c',
					700: '#252358',
					800: '#151435',
					900: '#070713'
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
			},
			keyframes: {
				overlayShow: {
					from: { opacity: '0' },
					to: { opacity: '1' }
				},
				contentShow: {
					from: {
						opacity: '0',
						transform: 'translate(-50%, -80%) scale(0.5)'
					},
					to: { opacity: '1', transform: 'translate(-50%, -50%) scale(1)' }
				}
			},
			animation: {
				overlayShow: 'overlayShow 250ms cubic-bezier(0.16, 1, 0.3, 1)',
				contentShow: 'contentShow 250ms cubic-bezier(0.16, 1, 0.3, 1)'
			}
		}
	},
	plugins: []
};
