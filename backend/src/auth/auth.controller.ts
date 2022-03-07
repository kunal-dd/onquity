import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import User from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { GetUser } from './decorator/get-user.decorator';
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
  public async login(@Body() loginDto: LoginDto): Promise<any> {
    return await this.authService.login(loginDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthenticationGuard)
  @Get('/logout')
  logout(@GetUser() user: User) {
    this.authService.signOut(user);
  }

  @UseGuards(JwtRefreshTokenGuard)
  @Post('/refresh-token')
  public async refreshToken(
    @GetUser() user: User,
    @Body() token: RefreshTokenDto,
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
