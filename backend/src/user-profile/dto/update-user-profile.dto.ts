import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import User from 'src/users/entities/user.entity';
import {
  COMPANY_SIZE,
  COMPANY_TYPE,
  INDIVIDUAL_USER_TYPE,
  TRUE_FALSE_ENUM,
} from 'src/utils/constant';

export class UpdateUserProfileDto {
  @ApiProperty({
    enum: INDIVIDUAL_USER_TYPE,
    isArray: false,
    example: INDIVIDUAL_USER_TYPE.SKILLED,
  })
  @IsOptional()
  @IsEnum(INDIVIDUAL_USER_TYPE)
  user_type: INDIVIDUAL_USER_TYPE;

  @ApiProperty()
  @IsOptional()
  current_position: string;

  @ApiProperty()
  @IsOptional()
  industry: string;

  @ApiProperty()
  @IsOptional()
  location: string;

  @ApiProperty()
  @IsOptional()
  headline: string;

  @ApiProperty({
    enum: TRUE_FALSE_ENUM,
    isArray: false,
    example: TRUE_FALSE_ENUM.NO,
  })
  @IsOptional()
  @IsEnum(TRUE_FALSE_ENUM)
  is_student: TRUE_FALSE_ENUM;

  @ApiProperty({
    enum: TRUE_FALSE_ENUM,
    isArray: false,
    example: TRUE_FALSE_ENUM.YES,
  })
  @IsOptional()
  @IsEnum(TRUE_FALSE_ENUM)
  is_age_verified: TRUE_FALSE_ENUM;

  @ApiProperty()
  @IsOptional()
  about: string;

  @ApiProperty()
  @IsOptional()
  area_of_expertise: string[];

  @ApiProperty()
  @IsOptional()
  total_work_experience: string;
}
