import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Put,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { JwtAuthenticationGuard } from 'src/auth/guard/jwt.guard';
import User from 'src/users/entities/user.entity';
import { StartupProfileDto } from './dto/startup-profile.dto';
import { IStartupProfile } from './interfaces/startup.interface';
import { StartupService } from './startup.service';

@ApiTags('startup')
@Controller('startup')
export class StartupController {
  constructor(private readonly startupService: StartupService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthenticationGuard)
  @Post()
  public async createStartupProfile(
    @Res() res,
    @GetUser() user: User,
    @Body(ValidationPipe) startupProfileDto: StartupProfileDto,
  ): Promise<IStartupProfile> {
    try {
      const sp = await this.startupService.create(startupProfileDto, user);
      return res.status(HttpStatus.OK).json({
        startup_profile: sp,
        status: 200,
      });
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthenticationGuard)
  @Put()
  public async updateStartupProfile(@GetUser() user: User, @Res() res) {
    return res.status(HttpStatus.OK).json({
      message: 'User logged out successfully!',
      status: 200,
    });
  }
}
