import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { MainRoleGuard } from 'src/auth/guards/role.guard';
import { UserAuth } from 'src/auth/guards/userAuth.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { BPH_ROLE } from 'src/entities/users/types/bph.types';
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

  @UseGuards(UserAuth)
  @Get()
  protectedRoute() {
    return 'You have access!';
  }
}
