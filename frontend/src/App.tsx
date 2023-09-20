import { QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { queryClient } from '@/shared/query';
import { AppRouter } from '@/src/router';

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
