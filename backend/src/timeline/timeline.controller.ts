import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { Roles } from 'src/auth/decorator/role.decorator';
import { JwtAuthenticationGuard } from 'src/auth/guard/jwt.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { IUsers } from 'src/users/interfaces/user.interface';
import { ROLES } from 'src/utils/constant';
import { TimelineService } from './timeline.service';

@ApiTags('timeline')
@Controller('timeline')
@UseGuards(JwtAuthenticationGuard)
@ApiBearerAuth()
export class TimelineController {
  constructor(private readonly timelineService: TimelineService) {}

  @UseGuards(RolesGuard)
  @Roles(ROLES.INDIVIDUAL_USER)
  @Get('/user')
  public async getUserTimeline(@GetUser() user: IUsers): Promise<any> {
    return {
      message: "Individual Timeline"
    };
  }

  @UseGuards(RolesGuard)
  @Roles(ROLES.STARTUP)
  @Get('/startup')
  public async getStartupTimeline(@GetUser() user: IUsers): Promise<any> {
    return {
      message: "Startup Timeline"
    };
  }
}
