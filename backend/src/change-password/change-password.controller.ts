import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthenticationGuard } from 'src/auth/guard/jwt.guard';
import { ChangePasswordService } from './change-password.service';
import { ChangePasswordDto } from './dto/change-password.dto';

@ApiTags('auth')
@Controller('auth/change-password')
export class ChangePasswordController {
  constructor(private readonly changePasswordService: ChangePasswordService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthenticationGuard)
  @Post()
  public async changePassword(
    @Res() res,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<any> {
    try {
      await this.changePasswordService.changePassword(changePasswordDto);

      return res.status(HttpStatus.OK).json({
        message: 'Request Change Password Successfully!',
        status: 200,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Change password failed!',
        status: 400,
      });
    }
  }
}
