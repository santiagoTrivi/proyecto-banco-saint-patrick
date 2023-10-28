const root = '/' as const;
const authRoot = `${root}auth/` as const;
const movementsRoot = `${root}movements/` as const;

const authRoutes = {
	path: 'auth',
	root: authRoot,
	login: {
		relative: 'login',
		absolute: `${authRoot}login`
	},
	register: {
		relative: 'register',
		absolute: `${authRoot}register`
	},
	closedSession: {
		relative: 'closed-session',
		absolute: `${authRoot}closed-session`
	}
} as const;

const movementRoutes = {
	path: 'movements',
	root: movementsRoot,
	new: {
		relative: 'new',
		absolute: `${movementsRoot}new`
	},
	confirm: {
		relative: 'confirm',
		absolute: `${movementsRoot}confirm`
	}
};

export const webRoutes = {
	root,
	auth: authRoutes,
	movements: movementRoutes
} as const;
