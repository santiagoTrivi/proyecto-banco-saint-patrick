export interface MovementFilterProps {
	until: Date | null;
	from: Date | null;
}

export class MovementFilter {
	until: Date | null;
	from: Date | null;

	constructor(props: MovementFilterProps) {
		this.until = props.until;
		this.from = props.from;
	}

	static month(): MovementFilter {
		return new MovementFilter({
			until: new Date(),
			from: new Date(new Date().setMonth(new Date().getMonth() - 1))
		});
	}

	static default(): MovementFilter {
		return new MovementFilter({
			until: null,
			from: null
		});
	}

	static create(props: MovementFilterProps): MovementFilter {
		return new MovementFilter(props);
	}

	change(movementFilter: Partial<MovementFilterProps>): MovementFilter {
		return MovementFilter.create({ ...this, ...movementFilter });
	}
}
