/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import path from 'path';
import { configDefaults, mergeConfig } from 'vitest/config';

import viteConfig from './vite.config';

export default mergeConfig(viteConfig, {
	plugins: [react()],
	base: './',
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: ['vitestSetup.ts'],
		exclude: [...configDefaults.exclude],
		alias: [
			{
				find: '@/transactions',
				replacement: path.resolve(__dirname, 'src/transactions')
			},
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
