export function formatMoney(amount: number, currency = 'USD') {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency
	}).format(amount);
}
