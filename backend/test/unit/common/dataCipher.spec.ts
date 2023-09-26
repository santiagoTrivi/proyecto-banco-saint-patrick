import { Test, TestingModule } from '@nestjs/testing';
import { DataCipher } from '../../../src/common/useCase/dataCipher';



describe('DataCipher', () => {
  let dataCipher: DataCipher

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({ 
      providers: [DataCipher],
    }).compile();

    dataCipher = module.get<DataCipher>(DataCipher)
  });
  
  
  it('dataCipher should be defined', () => {
    expect(dataCipher).toBeDefined();
  })

  describe('hash method of Datacipher class', () => {
    let dataToHash = 'RandomPassword./';
    let hashed;
    let secondHashed;

    beforeEach(async() => {
        hashed = await dataCipher.hash(dataToHash);
        secondHashed = await dataCipher.hash(dataToHash);
    })


    test('should hash the given data and return it ', () => {
        expect(hashed).not.toEqual(dataToHash);
    })

    test('should hash snd return a different one', () => {
        expect(secondHashed).not.toEqual(hashed);
    })
 
  })

  describe('compare method of Datacipher class', () => {
    let firstToHash = 'firstRandomPassword./';
    let secondToHash = 'secondRandomPassword./';
    let hashed;
    let secondHashed;
    let result;

    beforeEach(async() => {
        hashed = await dataCipher.hash(firstToHash);
        secondHashed = await dataCipher.hash(secondToHash);
    })

    test('should return false if the input is different', async () => {
        result = await dataCipher.compare(firstToHash, secondHashed);
        expect(result).toBeFalsy();
    })

    test('should return false if the input is different', async () => {
        result = await dataCipher.compare(secondToHash, hashed);
        expect(result).toBeFalsy();
    })

    test('should return true if the input is the same', async () => {
        result = await dataCipher.compare(firstToHash, hashed);
        expect(result).toBeTruthy();
    })

    test('should return true if the input is the same', async () => {
        result = await dataCipher.compare(secondToHash, secondHashed);
        expect(result).toBeTruthy();
    })
 
  })
 
});
