import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { JwtAuthenticationGuard } from 'src/auth/guard/jwt.guard';
import { IUsers } from 'src/users/interfaces/user.interface';
import { TimelineService } from './timeline.service';

@ApiTags('timeline')
@Controller('timeline')
export class TimelineController {
  constructor(private readonly timelineService: TimelineService) {}

  @UseGuards(JwtAuthenticationGuard)
  @ApiBearerAuth()
  @Get('/user')
  public async getUserTimeline(@GetUser() user: IUsers): Promise<any> {
    return true;
  }

  @UseGuards(JwtAuthenticationGuard)
  @ApiBearerAuth()
  @Get('/startup')
  public async getStartupTimeline(@GetUser() user: IUsers): Promise<any> {
    return true;
  }
}
