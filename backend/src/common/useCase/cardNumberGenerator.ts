import { DataGenerator } from '../domain/interface/IDataGenerator';

export class CardNumberGenerator implements DataGenerator {
  run(): string {
    const currentDate = new Date();

    const year = currentDate.getFullYear().toString().slice(-4);
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');
    const randomDigits = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, '0');

    const result = randomDigits + year + month + day + seconds;
    return result;
  }
}
