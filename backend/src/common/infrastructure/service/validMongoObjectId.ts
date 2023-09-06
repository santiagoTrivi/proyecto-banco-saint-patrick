import { Injectable, BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ValidateObjectIdService {
  validate(id: string): void {
    const isValidObjectId: boolean = Types.ObjectId.isValid(id);
    if (!isValidObjectId) {
      throw new BadRequestException('Invalid ObjectId');
    }
  }
}