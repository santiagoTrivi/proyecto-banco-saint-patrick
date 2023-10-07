const root = '/' as const;
const authRoot = `${root}auth/` as const;
const transactionsRoot = `${root}transactions/` as const;

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

const transactionRoutes = {
	path: 'transactions',
	root: transactionsRoot,
	new: {
		relative: 'new',
		absolute: `${transactionsRoot}new`
	},
	confirm: {
		relative: 'confirm',
		absolute: `${transactionsRoot}confirm`
	}
};

export const webRoutes = {
	root,
	auth: authRoutes,
	transactions: transactionRoutes
} as const;
