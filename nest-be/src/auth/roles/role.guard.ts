import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  // Reflector is to retrieve metadata/context
  constructor(private reflector: Reflector) {}

  checkRoles(roles: string[], userRole: string) {
    // Checks if the context role (userRole) is in the required roles array
    return roles.some((role) => role === userRole);
  }

  // Can activate condition
  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return this.checkRoles(roles, user.role);
  }
}
