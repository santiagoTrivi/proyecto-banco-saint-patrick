export enum MovementType {
  DEPOSIT = 'DEPOSIT',
  TRANSFERENCE = 'TRANSFERENCE',
}

export type MovemenTypeValue = keyof typeof MovementType;
