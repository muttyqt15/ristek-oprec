import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';
import { Request } from 'express';
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUpUser(@Body() createUserDto: AuthDto) {
    return await this.authService.signUp(createUserDto);
  }
  @Post('login')
  async loginUser(@Body() createUserDto: AuthDto) {
    return await this.authService.logIn(createUserDto);
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  async logoutUser(@Req() req: Request) {
    await this.authService.logOut(req.user['subject'], req.user['role']);
    return {
      code: HttpStatus.OK,
      message: `${req.user['role']} with id of ${req.user['subject']} has successfully logged out!}`,
    };
  }

  @Get('refresh')
  refreshTokens(@Req() req: Request) {
    const userId = req.user['subject'];
    const userRole = req.user['role'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken, userRole);
  }
}
