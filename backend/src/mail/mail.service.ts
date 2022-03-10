import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import User from 'src/users/entities/user.entity';
import { join } from 'path';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendForgotPassword(user: User) {
    await this.mailerService.sendMail({
      to: user.email,
      from: '"Team Onquity" <hello@onquity.com>',
      subject: 'Reset password | Onquity',
      template: 'password-reset', // `.hbs` extension is appended automatically
      context: {
        title: "Reset password | Onquity",
        name: user.full_name,
        otp: user.reset_password_otp,
      },
    });
  }

  async sendWelcomeEmail(user: User) {
    await this.mailerService.sendMail({
      to: user.email,
      from: '"Team Onquity" <hello@onquity.com>',
      subject: "We're grateful to welcoming you on onquity!",
      template: 'welcome',
      context: {
        title: "Welcome to onquity",
        name: user.full_name,
      },
    });
  }
}
