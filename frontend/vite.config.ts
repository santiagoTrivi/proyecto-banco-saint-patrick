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
				find: '@/auth',
				replacement: path.resolve(__dirname, 'src/auth')
			},
			{
				find: '@/tests',
				replacement: path.resolve(__dirname, '__TESTS__')
			},
			{ find: '@', replacement: path.resolve(__dirname) }
		]
	}
});
