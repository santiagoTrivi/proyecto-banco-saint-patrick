export interface PaginationProps {
	page: number;
	limit: number;
}

export class Pagination {
	readonly page: number;
	readonly limit: number;

	constructor(props: PaginationProps) {
		this.page = props.page;
		this.limit = props.limit;
	}

	static default() {
		return new Pagination({ page: 1, limit: 10 });
	}

	get offset() {
		return (this.page - 1) * this.limit;
	}

	change(pagination: Partial<PaginationProps>) {
		return new Pagination({ ...this, ...pagination });
	}
}
