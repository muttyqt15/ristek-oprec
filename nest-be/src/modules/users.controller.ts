import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthDto } from 'src/auth/auth.dto';
import { UserAuth } from 'src/auth/guards/userAuth.guard';
import { hashPassword, matchPassword } from 'src/utils/hash';
import { UsersService } from './users.service';

@ApiTags('TESTING')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
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

  @Post()
  async createSuperAdmin(@Body() createSuperAdminDto: AuthDto) {
    console.log(createSuperAdminDto);
    const { password } = createSuperAdminDto;
    const hashedPassword = await hashPassword(password);
    return await this.usersService.createSuperAdmin({
      ...createSuperAdminDto,
      password: hashedPassword,
    });
  }

  @UseGuards(UserAuth)
  @Get()
  protectedRoute() {
    return 'You have access!';
  }
}
