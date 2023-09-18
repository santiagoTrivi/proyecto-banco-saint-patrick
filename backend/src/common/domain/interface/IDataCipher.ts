
export interface IDataCipher {
    hash(data: string): Promise<string>;
    compare(data: string, encrytedData: string): Promise<boolean>;
}