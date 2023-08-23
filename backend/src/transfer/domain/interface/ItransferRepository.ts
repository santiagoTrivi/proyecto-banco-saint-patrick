export interface ITransferRepository<T> {
  getTransfer(id: string): Promise<T>;
  getTansfers(): Promise<T[]>;
  getTransferHistory(card: string): Promise<T>[];
}
