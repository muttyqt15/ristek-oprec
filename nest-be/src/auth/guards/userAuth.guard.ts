import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class UserAuth extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    // Extract token from headers, cookies, etc.
    const token = request.headers.authorization?.replace('Bearer', '').trim(); // Assuming token is provided in the 'Authorization' header
    // Set the extracted token in the request object
    request.jwtToken = token;
    return super.canActivate(context);
  }
}
