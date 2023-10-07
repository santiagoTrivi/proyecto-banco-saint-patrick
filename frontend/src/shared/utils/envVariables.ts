export const envVariables = {
	APP_ROOT:
		import.meta.env.VITE_APP_ROOT || ('http://127.0.0.1:5173/' as const),
	API_URL: import.meta.env.VITE_APP_API_URL,
	APP_NAME: import.meta.env.VITE_APP_NAME
};
