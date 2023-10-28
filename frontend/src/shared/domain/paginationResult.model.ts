export class PaginationResult<T> {
	readonly items: T[];
	readonly totalItems: number;
	readonly totalPages: number;

	constructor(items: T[], totalItems: number, totalPages: number) {
		this.items = items;
		this.totalItems = totalItems;
		this.totalPages = totalPages;
	}

	static empty<T>() {
		return new PaginationResult<T>([], 0, 0);
	}

	static create<T>(items: T[], totalItems: number, totalPages: number) {
		return new PaginationResult<T>(items, totalItems, totalPages);
	}
}
