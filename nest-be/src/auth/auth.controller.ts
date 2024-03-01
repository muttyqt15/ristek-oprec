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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from './roles/roles.decorator';
import { MainRole } from 'src/entities/users/types/entity.types';

@ApiTags('AUTHENTICATION')
@Roles(MainRole.SUPER_ADMIN)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Signs up user and returns JWT access and refresh token - Public',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Successfully created JWT Access and Refresh Tokens',
  })
  @Post('signup')
  async signUpUser(@Body() createUserDto: AuthDto) {
    return await this.authService.signUp(createUserDto);
  }
  @ApiOperation({
    summary: 'Logs in user and returns JWT access and refresh token - Public',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully logged user in and renewed their tokens!',
  })
  @Post('login')
  async loginUser(@Body() createUserDto: AuthDto) {
    return await this.authService.logIn(createUserDto);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary:
      'Logs user out by nullifying their refresh token - Only currently authenticated users can use',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully logged user out and removed their tokens!',
  })
  @UseGuards(AccessTokenGuard)
  @Get('logout')
  async logoutUser(@Req() req: Request) {
    await this.authService.logOut(req.user['subject'], req.user['role']);
    return {
      code: HttpStatus.OK,
      message: `${req.user['role']} with id of ${req.user['subject']} has successfully logged out!}`,
    };
  }

  @ApiOperation({
    summary: 'Refreshes token',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully refreshed token!',
  })
  @Get('refresh')
  refreshTokens(@Req() req: Request) {
    const userId = req.user['subject'];
    const userRole = req.user['role'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken, userRole);
  }
}
