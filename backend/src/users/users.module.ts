import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import User from './entities/user.entity';
import UserSessions from './entities/user-sessions.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserSessions])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
