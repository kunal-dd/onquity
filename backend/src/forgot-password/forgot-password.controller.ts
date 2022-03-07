import { Body, HttpStatus, Post, Res } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ForgotPasswordService } from './forgot-password.service';

@ApiTags('auth')
@Controller('auth/forgot-password')
export class ForgotPasswordController {
  constructor(private readonly forgotPasswordService: ForgotPasswordService) {}

  @Post()
  public async forgotPassword(
    @Res() res,
    @Body() forgotPasswordDto: ForgotPasswordDto,
  ): Promise<any> {
    try {
      await this.forgotPasswordService.forgotPassword(forgotPasswordDto);

      return res.status(HttpStatus.OK).json({
        message: 'Request Reset Password Successfully!',
        status: 200,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Forgot password failed!',
        status: 400,
      });
    }
  }
}
