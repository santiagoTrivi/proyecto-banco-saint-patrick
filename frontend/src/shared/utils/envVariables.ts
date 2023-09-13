export const envVariables = {
	VITE_APP_ROOT:
		import.meta.env.VITE_APP_ROOT || ('http://127.0.0.1:5173/' as const),
	VITE_APP_API_URL: import.meta.env.VITE_APP_API_URL
};
