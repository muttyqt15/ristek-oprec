import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async signUpUser(@Body() createUserDto: AuthDto) {
    return await this.authService.signUp(createUserDto);
  }
}
