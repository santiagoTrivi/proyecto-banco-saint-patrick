import { clientStub } from "../../../../../test/unit/stub";


export const ClientService = jest.fn().mockReturnValue({
    create: jest.fn(),
    findOneByUsername: jest.fn().mockReturnValue(clientStub()),
    findAll: jest.fn(),
    update: jest.fn().mockReturnValue(clientStub()),
    findOne: jest.fn().mockReturnValue(clientStub())
})