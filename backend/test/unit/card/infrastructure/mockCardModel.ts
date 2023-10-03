import { cardStub } from "../stub/card.stub";


export const mockCardModel = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findById: jest.fn(),
}


export const MockCardService = jest.fn().mockReturnValue({
    create: jest.fn().mockReturnValue(cardStub()),
    findAll: jest.fn(),
    findOne: jest.fn().mockReturnValue(cardStub()),
    update: jest.fn().mockReturnValue(cardStub()),
    findById: jest.fn().mockReturnValue(cardStub())
})