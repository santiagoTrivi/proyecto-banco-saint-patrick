const root = import.meta.env.VITE_APP_ROOT || ('/' as const);
const authRoot = `${root}auth/` as const;

const authRoutes = {
	root: authRoot,
	login: {
		relative: 'login',
		absolute: `${authRoot}login`
	},
	register: {
		relative: 'register',
		absolute: `${authRoot}register`
	}
} as const;

export const webRoutes = {
	root,
	auth: authRoutes
} as const;
