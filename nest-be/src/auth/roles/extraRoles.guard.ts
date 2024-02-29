import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { BPH_ROLE } from 'src/entities/users/types/bph.types';
import { JwtPayload } from '../strategies/accessToken.strategy';

@Injectable()
export class ExtraRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Get required BPH_ROLES from context (decorator)
    const roles = this.reflector.get<BPH_ROLE[]>(
      'bphRole',
      context.getHandler(),
    );
    if (!roles) {
      // No BPH role requirement specified, access granted
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user: JwtPayload = request.user; // Assuming user object is stored in the request

    console.log(user, user.extraRoles, roles);
    // Check if user has any of the required BPH roles
    // user.bph_role extracts bph_role property from user if exists
    const hasBphRole = this.checkBPHRoles(roles, user.extraRoles);
    return hasBphRole;
  }

  private checkBPHRoles(requiredRoles: BPH_ROLE[], userRole: any): boolean {
    return requiredRoles.includes(userRole);
  }
}
