import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import User from 'src/users/entities/user.entity';
import { IUsers } from 'src/users/interfaces/user.interface';
import { AuthService } from './auth.service';
import { GetUser } from './decorator/get-user.decorator';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { ForgotPasswordDto } from './dtos/forgot-password.dto';
import { LoginDto } from './dtos/login.dto';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { RegisterUserDto } from './dtos/register-user.dto';
import { JwtRefreshTokenGuard } from './guard/jwt-refresh.guard';
// import { JwtRefreshTokenGuard } from './guard/jwt-refresh.guard';
import { JwtAuthenticationGuard } from './guard/jwt.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  signUp(
    @Body(ValidationPipe) registerUserDto: RegisterUserDto,
  ): Promise<{ message: string }> {
    return this.authService.register(registerUserDto);
  }

  @Post('/login')
  public async login(@Body(ValidationPipe) loginDto: LoginDto): Promise<any> {
    return await this.authService.login(loginDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthenticationGuard)
  @Get('/logout')
  public async logout(@GetUser() user: IUsers, @Res() res) {
    await this.authService.signOut(user);
    return res.status(HttpStatus.OK).json({
      message: 'User logged out successfully!',
      status: 200,
    });
  }

  @Post('/forgot-password')
  public async forgotPassword(
    @Res() res,
    @Body() forgotPasswordDto: ForgotPasswordDto,
  ): Promise<any> {
    try {
      await this.authService.forgotPassword(forgotPasswordDto);

      return res.status(HttpStatus.OK).json({
        message: 'Request Reset Password Successfully!',
        status: 200,
      });
    } catch (err) {
      console.log('Err: ', err);
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Forgot password failed!',
        status: 400,
      });
    }
  }

  @Get('/change-password/:token/:key')
  public async changePassword(
    @Res() res,
    @Param('token') token: string,
    @Param('key') key: string,
  ): Promise<any> {
    try {
      if (!token || !key) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: 'Error: Forgot password failed!',
          status: 400,
        });
      }
      const data = await this.authService.validateTokenAndKey(token, key);
      return res.status(HttpStatus.OK).json({
        message: data,
        status: 200,
      });
    } catch (err) {
      console.log('Err: ', err);
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Forgot password failed!',
        status: 400,
      });
    }
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('/change-password')
  public async resetPassword(
    @Body(ValidationPipe) changePassword: ChangePasswordDto,
    @GetUser() user: IUsers,
  ): Promise<any> {
    return await this.authService.resetPassword(changePassword, user);
  }

  @UseGuards(JwtRefreshTokenGuard)
  @Post('/refresh-token')
  public async refreshToken(
    @GetUser() user: User,
    @Body(ValidationPipe) token: RefreshTokenDto,
  ) {
    const user_info = await this.authService.getUserIfRefreshTokenMatches(
      token.refresh_token,
      user.email,
    );
    if (user_info) {
      const userInfo = {
        email: user_info.email,
      };

      return this.authService.getNewAccessAndRefreshToken(userInfo);
    } else {
      return null;
    }
  }
}
