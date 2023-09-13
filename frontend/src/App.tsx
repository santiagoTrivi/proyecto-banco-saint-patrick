import { QueryClientProvider } from '@tanstack/react-query';
import 'react-toastify/dist/ReactToastify.css';

import { queryClient } from '@/shared/query';
import { AppRouter } from '@/src/router';
import { ToastContainer } from 'react-toastify';

function App() {
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<AppRouter />
			</QueryClientProvider>

			<ToastContainer />
		</>
	);
}

export default App;
