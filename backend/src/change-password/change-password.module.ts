import { Module } from '@nestjs/common';
import { ChangePasswordService } from './change-password.service';
import { ChangePasswordController } from './change-password.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from 'src/users/entities/user.entity';
import { MailerModule } from 'src/mailer/mailer.module';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), MailerModule],
  providers: [ChangePasswordService, UsersService],
  controllers: [ChangePasswordController]
})
export class ChangePasswordModule {}
