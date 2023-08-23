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
