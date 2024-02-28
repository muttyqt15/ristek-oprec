/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { BphService } from 'src/users/internal/bph/bph.service';
import { PiService } from 'src/users/internal/pi/pi.service';

@ValidatorConstraint({ name: 'isUnique', async: true })
@Injectable()
export default class IsUnique implements ValidatorConstraintInterface {
  constructor(
    private readonly bphService: BphService,
    private readonly piService: PiService,
  ) {}
  async validate(value: any, args: ValidationArguments) {
    return true; // Return true if value is unique, false otherwise
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be unique.`;
  }
}
