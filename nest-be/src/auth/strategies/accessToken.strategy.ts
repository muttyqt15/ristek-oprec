import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { MainRole } from 'src/entities/users/types/entity.types';
import { ControlRoles } from '../auth.service';

export type JwtPayload = {
  subject: string;
  username: string;
  role: MainRole;
  extraRoles: ControlRoles;
};

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_ACCESS_SECRET,
    });
  }

  validate(payload: JwtPayload) {
    return payload;
  }
}
