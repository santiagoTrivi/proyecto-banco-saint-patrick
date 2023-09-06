import { compare, compareSync, genSalt, hash } from 'bcrypt';

export class DataCipher {
  private readonly saltNumber: number = 10;

  async hash(data: string): Promise<string> {
    const salt = await genSalt(this.saltNumber);
    const hashedData = await hash(data, salt);

    return hashedData;
  }

  async compare(data: string, encrytedData: string): Promise<boolean> {
    return await compare(data, encrytedData);
  }
}
