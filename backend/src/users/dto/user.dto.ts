import { MaxLength, IsNotEmpty, IsEmail, IsString, IsNumber } from 'class-validator';
import { ROLES } from 'src/utils/constant';

export class UserDto {
  @IsString()
  @MaxLength(30)
  readonly full_name: string;

  @IsNumber()
  readonly mobile_no: number;

  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(60)
  password: string;

  role: ROLES;
}
