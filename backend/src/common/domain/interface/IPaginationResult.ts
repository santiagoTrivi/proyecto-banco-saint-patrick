export interface PaginationResult<T> {
  data: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  from: Date;
  until: Date;
}
