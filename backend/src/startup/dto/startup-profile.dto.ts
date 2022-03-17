import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import User from 'src/users/entities/user.entity';
import { COMPANY_SIZE, COMPANY_TYPE } from 'src/utils/constant';

export class StartupProfileDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  startup_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  startup_tagline: string;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  incorporation_date: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  website: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  industry: string;

  @ApiProperty({
    enum: COMPANY_SIZE,
    isArray: false,
    example: COMPANY_SIZE.MEDIUM,
  })
  @IsString()
  @IsNotEmpty()
  @IsEnum(COMPANY_SIZE)
  company_size: COMPANY_SIZE;

  @ApiProperty({
    enum: COMPANY_TYPE,
    isArray: false,
    example: COMPANY_TYPE.PRIVATELY_HELD,
  })
  @IsNotEmpty()
  @IsEnum(COMPANY_TYPE)
  company_type: COMPANY_TYPE;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  location: string;

  @IsOptional()
  user: User;

  @IsOptional()
  completion_percentage: string;
}
