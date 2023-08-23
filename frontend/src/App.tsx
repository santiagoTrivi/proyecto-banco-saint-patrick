import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from '@/src/query';
import { AppRouter } from '@/src/router';
import './App.css';

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<AppRouter />
		</QueryClientProvider>
	);
}

export default App;
