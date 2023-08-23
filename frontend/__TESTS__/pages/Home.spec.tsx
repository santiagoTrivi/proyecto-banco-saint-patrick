import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { HomePage } from '@/src/pages';
import { AppWrapper } from '@/tests/utils';

describe('Home', () => {
	it('should contain a heading', () => {
		render(<HomePage />, { wrapper: AppWrapper() });

		const heading = screen.getByText('Welcome to Bank Saint Patrick');

		expect(heading).toBeInTheDocument();
	});
});
