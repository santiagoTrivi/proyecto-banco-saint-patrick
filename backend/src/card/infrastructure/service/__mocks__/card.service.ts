import { cardStub } from "../../../../../test/unit/card/stub/card.stub";

export const CardService = jest.fn().mockReturnValue({
    create: jest.fn().mockReturnValue(cardStub()),
    findAll: jest.fn(),
    findOne: jest.fn().mockReturnValue(cardStub()),
    update: jest.fn().mockReturnValue(cardStub()),
    findById: jest.fn().mockReturnValue(cardStub())
})