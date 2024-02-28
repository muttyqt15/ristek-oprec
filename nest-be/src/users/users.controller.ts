import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { UserAuth } from 'src/auth/jwtguards/userAuth.guard';
import { RoleGuard } from 'src/auth/roles/role.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { MainRole } from 'src/entities/users/types/entity.types';
import { hashPassword, matchPassword } from 'src/utils/hash';

@Controller('users')
export class UsersController {
  @Post('hash')
  async hashPassword(@Body('password') password: string) {
    const hashedPassword = await hashPassword(password);
    return { hashedPassword };
  }

  @Post('compare')
  async comparePassword(
    @Body() body: { password: string; hashedPassword: string },
  ) {
    const { password, hashedPassword } = body;
    const isMatch = await matchPassword(password, hashedPassword);
    return { isMatch };
  }

  @Roles(MainRole.BPH)
  @UseGuards(UserAuth, RoleGuard)
  @Get()
  protectedRoute() {
    return 'You have access!';
  }
}
