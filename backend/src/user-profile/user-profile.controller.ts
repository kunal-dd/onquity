import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Res,
  ValidationPipe,
  HttpStatus,
  HttpException,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { Roles } from 'src/auth/decorator/role.decorator';
import { JwtAuthenticationGuard } from 'src/auth/guard/jwt.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import User from 'src/users/entities/user.entity';
import { ROLES } from 'src/utils/constant';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { UserProfileDto } from './dto/user-profile.dto';
import { IUserProfile } from './interfaces/user.interface';
import { UserProfileService } from './user-profile.service';

@ApiTags('users')
@Controller('user')
@ApiBearerAuth()
@UseGuards(JwtAuthenticationGuard, RolesGuard)
@Roles(ROLES.INDIVIDUAL_USER)
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Get('/profile')
  public async getProfile(
    @Res() res,
    @GetUser() user: User,
  ): Promise<IUserProfile> {
    try {
      const profile = await this.userProfileService.get(user);

      return res.status(HttpStatus.OK).json({
        startup_profile: profile,
        status: 200,
      });
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/profile')
  public async createUserProfile(
    @Res() res,
    @GetUser() user: User,
    @Body(ValidationPipe) userProfileDto: UserProfileDto,
  ): Promise<any> {
    try {
      const user_profile = await this.userProfileService.saveUserProfile(
        userProfileDto,
        user,
      );
      return res.status(HttpStatus.OK).json({
        user_profile: user_profile,
        status: 200,
      });
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  @Put('/profile')
  public async updateUserProfile(
    @GetUser() user: User,
    @Res() res,
    @Body(ValidationPipe) updateUserProfileDto: UpdateUserProfileDto,
  ): Promise<any> {
    try {
      await this.userProfileService.updateUserProfile(
        user,
        updateUserProfileDto,
      );

      return res.status(HttpStatus.OK).json({
        data: 'User profile has updated successfully!',
        status: 200,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: User not updated!',
        status: 400,
      });
    }
  }
}
