import { CardEntity } from "../../../../src/card/domain/Card.entity";


export const cardStub = (): CardEntity => {
    return {
        _id: '650cb360a63b5ed38fd3c8d1',
        clientId: '650cb329a63b5ed38fd3c8cc',
        card_number: "7687532023092128",
        PIN: "$2b$10$4Ca10giOMYFf1RZWnjg9s.G53..VJbWdyiwKWl7XC6DpS3o5XNYsW",
        current_balance: 1400,
        currency: '6508bbd55dc395e18036acf5',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
    }
}