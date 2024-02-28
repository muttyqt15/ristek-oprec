import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// IMPORTANT: will only authorize requests if there is a req object available so this is best for endpoints that require payload from req obj
@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt') {}
