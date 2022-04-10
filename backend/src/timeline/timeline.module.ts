import { Module } from '@nestjs/common';
import { TimelineService } from './timeline.service';
import { TimelineController } from './timeline.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import Post from 'src/post/entities/post.entity';
import { PostService } from 'src/post/post.service';
import UserSessions from 'src/users/entities/user-sessions.entity';
import { RedisCacheModule } from 'src/redis-cache/redis-cache.module';
@Module({
  imports: [TypeOrmModule.forFeature([User, Post, UserSessions]), RedisCacheModule],
  providers: [TimelineService, UsersService, PostService],
  controllers: [TimelineController],
})
export class TimelineModule {}
