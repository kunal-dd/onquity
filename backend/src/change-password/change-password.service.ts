import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class ChangePasswordService {
  constructor(private readonly usersService: UsersService) {}

  public async changePassword(
    changePasswordDto: ChangePasswordDto,
  ): Promise<any> {
    // this.sendMailChangePassword(changePasswordDto);

    return await this.usersService.updateByPassword(
      changePasswordDto.email,
      changePasswordDto.password,
    );
  }
}
