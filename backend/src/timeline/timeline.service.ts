import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PostService } from 'src/post/post.service';
import StartupProfile from 'src/users/entities/startup-profile.entity';
import UserProfile from 'src/users/entities/user-profile.entity';
import { UsersService } from 'src/users/users.service';
import { ITimeLineStartup } from './interface/timeline-startup.interface';
import { ITimeLineUser } from './interface/timeline-user.interface';

@Injectable()
export class TimelineService {
  constructor(
    private readonly usersService: UsersService,
    private readonly postService: PostService,
  ) {}

  public async getTimeline(option: string, current_user): Promise<any> {
    // TODO: Option vise timeline view
    try {
      const user = await this.usersService.findById(current_user.id);

      if (user.user_profile && user.user_profile instanceof UserProfile) {
        return this.timelineForIndividual(user.user_profile, option);
      } else if (
        user.startup_profile &&
        user.startup_profile instanceof StartupProfile
      ) {
        return this.timelineForStartups(user.startup_profile, option);
      } else {
        return {
          message: "Please completed you're profile",
          status: 400,
        };
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async timelineForIndividual(
    profile,
    timeline_view,
  ): Promise<any | ITimeLineUser[]> {
    if (profile.area_of_expertise.length > 0) {
      const user_expertise = profile.area_of_expertise;
      return this.postService.getPostsForIndividuals(user_expertise);
    } else {
      return {
        message: "Please make sure you've added the expertise in your profile",
        status: 400,
      };
    }
  }

  public async timelineForStartups(
    profile,
    timeline_view,
  ): Promise<any | ITimeLineStartup[]> {}
}
