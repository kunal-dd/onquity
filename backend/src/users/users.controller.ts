import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthenticationGuard } from 'src/auth/guard/jwt.guard';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthenticationGuard)
  @ApiBearerAuth()
  @Get('me')
  public async me(@Req() req): Promise<any> {
    return {
      user: req.user,
      status: 200,
    };
  }
}
