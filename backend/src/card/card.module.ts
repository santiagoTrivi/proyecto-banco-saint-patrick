import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Card, CardSchema } from './infrastructure/schemas/card.schema';
import { CardService } from './infrastructure/service/card.service';
import { RegisterCard } from './usecase/registerCard';

@Module({
    imports: [
        MongooseModule.forFeature([{name: Card.name, schema: CardSchema}]),
    ],
    providers:[CardService, RegisterCard],
    exports: [CardService, RegisterCard]
})
export class CardModule {}
