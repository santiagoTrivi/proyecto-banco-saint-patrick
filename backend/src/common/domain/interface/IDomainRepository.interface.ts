export interface DomainRepository<T> {
  create(create: T): Promise<T>;
  findAll(): Promise<T[]>;
  findOne(query: any): Promise<T | null>;
  findById(id: string): Promise<T | null>;
  update(id: string, updateData: Partial<T>);
}
