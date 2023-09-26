import { Test, TestingModule } from '@nestjs/testing';
import { CardNumberGenerator } from '../../../src/common/useCase/cardNumberGenerator';



describe('DataCipher', () => {
  let cardNumberGenerator: CardNumberGenerator

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({ 
      providers: [CardNumberGenerator],
    }).compile();

    cardNumberGenerator = module.get<CardNumberGenerator>(CardNumberGenerator)
  });
  
  
  it('dataCipher should be defined', () => {
    expect(cardNumberGenerator).toBeDefined()
  })

  describe('Generate different card number', () => {
  

    test('all generated card numbers should not be equal', async () => {
        expect(await cardNumberGenerator.run()).not.toEqual(await cardNumberGenerator.run());
        expect(await cardNumberGenerator.run()).not.toEqual(await cardNumberGenerator.run());
    })

    test('the length should be 16', async () => {
        expect(await cardNumberGenerator.run()).toHaveLength(16);
        expect(await cardNumberGenerator.run()).toHaveLength(16);
    })

    test('type should be string', async () => {
      const card_number = await cardNumberGenerator.run();
      expect(typeof card_number).toBe('string');
    })

  })
 
});
