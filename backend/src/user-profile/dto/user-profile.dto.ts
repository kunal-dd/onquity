import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import User from 'src/users/entities/user.entity';
import { COMPANY_SIZE, COMPANY_TYPE, INDIVIDUAL_USER_TYPE, TRUE_FALSE_ENUM } from 'src/utils/constant';

export class UserProfileDto {
  @ApiProperty({
    enum: INDIVIDUAL_USER_TYPE,
    isArray: false,
    example: INDIVIDUAL_USER_TYPE.SKILLED,
  })
  @IsString()
  @IsNotEmpty()
  @IsEnum(INDIVIDUAL_USER_TYPE)
  user_type: INDIVIDUAL_USER_TYPE;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  current_position: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  industry: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  headline: string;

  @ApiProperty({
    enum: TRUE_FALSE_ENUM,
    isArray: false,
    example: TRUE_FALSE_ENUM.NO,
  })
  @IsNotEmpty()
  @IsEnum(TRUE_FALSE_ENUM)
  is_student: TRUE_FALSE_ENUM;

  @ApiProperty({
    enum: TRUE_FALSE_ENUM,
    isArray: false,
    example: TRUE_FALSE_ENUM.YES,
  })
  @IsNotEmpty()
  @IsEnum(TRUE_FALSE_ENUM)
  is_age_verified: TRUE_FALSE_ENUM;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  about: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  area_of_expertise: string[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  total_work_experience: string;

  @IsOptional()
  user: User

  @IsOptional()
  completion_percentage: string
}
