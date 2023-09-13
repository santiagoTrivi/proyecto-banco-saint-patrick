import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	base: './',
	resolve: {
		alias: [
			{
				find: '@/cards',
				replacement: path.resolve(__dirname, 'src/cards')
			},
			{
				find: '@/users',
				replacement: path.resolve(__dirname, 'src/users')
			},
			{
				find: '@/auth',
				replacement: path.resolve(__dirname, 'src/auth')
			},
			{
				find: '@/shared',
				replacement: path.resolve(__dirname, 'src/shared')
			},
			{
				find: '@/ui',
				replacement: path.resolve(__dirname, 'src/ui')
			},
			{
				find: '@/tests',
				replacement: path.resolve(__dirname, '__TESTS__')
			},
			{ find: '@', replacement: path.resolve(__dirname) }
		]
	}
});
