export interface IbalanceUpdater {
  subtract(card: any, amount: number, transaction: any);
  add(card: any, amount: number, transaction: any);
}
