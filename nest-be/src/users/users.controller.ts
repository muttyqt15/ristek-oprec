import { Controller, Post, Body } from '@nestjs/common';
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
}
