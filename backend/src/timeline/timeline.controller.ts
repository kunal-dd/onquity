import {
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { JwtAuthenticationGuard } from 'src/auth/guard/jwt.guard';
import { IUsers } from 'src/users/interfaces/user.interface';
import { TimelineService } from './timeline.service';

@ApiTags('timeline')
@Controller('timeline')
@UseGuards(JwtAuthenticationGuard)
@ApiBearerAuth()
export class TimelineController {
  constructor(private readonly timelineService: TimelineService) {}

  @Get('/:option')
  public async getTimeLine(
    @Param('option') option: string,
    @GetUser() user: IUsers,
  ): Promise<any> {
    return this.timelineService.getTimeline(option, user);
  }
}
