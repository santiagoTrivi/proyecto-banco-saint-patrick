import { PartialType } from '@nestjs/mapped-types';
import { CreateCardDto } from '../../../auth/infrastructure/dto/create-card.dto';

export class UpdateCardDto extends PartialType(CreateCardDto) {}
