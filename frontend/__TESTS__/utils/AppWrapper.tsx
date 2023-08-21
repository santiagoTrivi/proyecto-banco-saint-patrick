import { MemoryRouter } from 'react-router-dom';
import { queryClientWrapper } from './QueryClientWrapper';

export function AppWrapper(): React.FC<{
	children: React.ReactNode;
}> {
	return function App({ children }) {
		const QueryClientWrapper = queryClientWrapper();

		return (
			<QueryClientWrapper>
				<MemoryRouter>{children}</MemoryRouter>
			</QueryClientWrapper>
		);
	};
}
