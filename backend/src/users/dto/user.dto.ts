import { MaxLength, IsNotEmpty, IsEmail, IsString } from 'class-validator';
import { ROLES } from 'src/utils/constant';

export class UserDto {
  @IsString()
  @MaxLength(30)
  readonly full_name: string;

  @IsString()
  readonly mobile_no: string;

  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(60)
  password: string;

  role: ROLES;
}
