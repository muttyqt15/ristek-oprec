import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { BPH_ROLE } from 'src/entities/users/types/bph.types';
import { MainRole } from 'src/entities/users/types/entity.types';
import { OKK_Mentoring } from 'src/entities/users/types/okk.types';

@Injectable()
export class MainRoleGuard implements CanActivate {
  // Reflector is to retrieve metadata/context
  constructor(private reflector: Reflector) {}

  checkRoles(
    roles: (MainRole | BPH_ROLE | OKK_Mentoring)[],
    userRole: (MainRole | BPH_ROLE | OKK_Mentoring)[],
  ) {
    console.log(roles, userRole);
    // Checks if the context role (userRole) is in the required roles array
    return roles.some((requiredRole) => userRole.includes(requiredRole));
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
