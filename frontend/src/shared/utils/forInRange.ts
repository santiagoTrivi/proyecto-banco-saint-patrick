export function forInRange(limit: number) {
	return Array.from({ length: limit }, (_, i) => i + 1);
}
