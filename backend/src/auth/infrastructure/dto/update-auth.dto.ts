import { PartialType } from '@nestjs/mapped-types';
import { CreateClientDto } from '@client/infrastructure/Dto/create-client.dto';

export class UpdateAuthDto extends PartialType(CreateClientDto) {}
