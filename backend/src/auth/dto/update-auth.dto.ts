import { PartialType } from '@nestjs/mapped-types';
import { CreateClientDto } from './create-client.dto';

export class UpdateAuthDto extends PartialType(CreateClientDto) {}
