export interface ITransferRepository<T> {
  getTransfer(id: string): Promise<T>;
  getTansfers(): Promise<T[]>;
  getTransferHistory(cardId: any, opction: any);
}
