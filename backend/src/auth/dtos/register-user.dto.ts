import { ApiProperty } from '@nestjs/swagger';
import {
  MaxLength,
  IsNotEmpty,
  IsEmail,
  IsString,
  IsEnum,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { ROLES } from 'src/utils/constant';

export class RegisterUserDto {
  @ApiProperty()
  @IsString()
  @MaxLength(30)
  readonly full_name: string;

  @ApiProperty()
  @IsNumber()
  readonly mobile_no: number;

  @ApiProperty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(60)
  password: string;

  @ApiProperty({
    enum: ROLES,
    isArray: false,
    example: ROLES.INDIVIDUAL_USER,
  })
  @IsOptional()
  @IsEnum(ROLES)
  role: ROLES;

  @IsOptional()
  profile_uid: string;
}
