import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// IMPORTANT: will only authorize requests if there is a req object available
@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt') {}
