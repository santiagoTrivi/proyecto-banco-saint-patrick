export interface ITransferRepository<T> {
  getTransfer(query: any): Promise<T>;
  getTansfers(): Promise<T[]>;
  getTransferHistory(cardId: any, opction: any);
}
