import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserAuth } from 'src/auth/guards/userAuth.guard';
import { hashPassword, matchPassword } from 'src/utils/hash';

@ApiTags('TESTING')
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
