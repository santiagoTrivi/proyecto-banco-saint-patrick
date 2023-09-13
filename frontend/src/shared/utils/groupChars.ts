export function groupChars(str: string, n: number) {
	const group = str.match(new RegExp(`.{1,${n}}`, 'g'));
	return group ? group.join(' ') : '';
}
