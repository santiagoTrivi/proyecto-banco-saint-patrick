export interface ITransferRepository<T> {
  getTransfer(query: any): Promise<T>;
  getTansfers(): Promise<T[]>;
  getTransferHistory(cardId: string, opction: any);
}
