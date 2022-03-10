import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import User from 'src/users/entities/user.entity';
import { join } from 'path';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: User, token: string) {
    const url = `example.com/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './confirmation', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        name: user.full_name,
        url,
      },
    });
  }

  async sendWelcomeEmail(user: User) {
    await this.mailerService.sendMail({
      to: user.email,
      from: '"Team Onquity" <hello@onquity.com>',
      subject: "We're grateful to welcoming you on onquity!",
      template: 'confirmation',
      context: {
        title: "Welcome to onquity",
        name: user.full_name,
      },
    });
  }
}
