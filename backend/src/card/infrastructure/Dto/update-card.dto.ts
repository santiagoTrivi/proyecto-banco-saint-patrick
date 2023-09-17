import { PartialType } from '@nestjs/mapped-types';
import { CardDto } from './card.dto';

export class UpdateCardDto extends PartialType(CardDto) {}
