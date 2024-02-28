import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { BPH_ROLE } from 'src/entities/users/types/bph.types';
import { MainRole } from 'src/entities/users/types/entity.types';
import { OKK_Mentoring } from 'src/entities/users/types/okk.types';
export type ControlRoles = MainRole | BPH_ROLE | OKK_Mentoring;

type JwtPayload = {
  subject: string;
  username: string;
  role: MainRole;
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
