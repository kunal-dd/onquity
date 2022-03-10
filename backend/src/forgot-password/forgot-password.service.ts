import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import User from 'src/users/entities/user.entity';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { generateRandomNumber } from 'src/utils/helper';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class ForgotPasswordService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly mailService: MailService,
  ) {}

  public async forgotPassword(
    forgotPasswordDto: ForgotPasswordDto,
  ): Promise<any> {
    const userUpdate = await this.userRepository.findOne({
      email: forgotPasswordDto.email,
    });

    userUpdate.reset_password_otp = await generateRandomNumber(6, true);

    this.sendMailForgotPassword(userUpdate);

    return await this.userRepository.save(userUpdate);
  }

  private sendMailForgotPassword(user): void {
    this.mailService
      .sendForgotPassword(user)
      .then((response) => {
        console.log(response);
        console.log('User Registration: Send Mail successfully!');
      })
      .catch((err) => {
        console.log(err);
        console.log('User Registration: Send Mail Failed!');
      });
  }
}
