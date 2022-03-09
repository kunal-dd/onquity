import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import User from 'src/users/entities/user.entity';
import { COMPANY_SIZE, COMPANY_TYPE } from 'src/utils/constant';

export class UpdateStartupProfileDto {
  @ApiProperty()
  @IsOptional()
  startup_name: string;

  @ApiProperty()
  @IsOptional()
  startup_tagline: string;

  @ApiProperty()
  @IsDate()
  @IsOptional()
  incorporation_date: Date;

  @ApiProperty()
  @IsOptional()
  website: string;

  @ApiProperty()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsOptional()
  industry: string;

  @ApiProperty({
    enum: COMPANY_SIZE,
    isArray: false,
    example: COMPANY_SIZE.MEDIUM,
  })
  @IsOptional()
  @IsEnum(COMPANY_SIZE)
  company_size: COMPANY_SIZE;

  @ApiProperty({
    enum: COMPANY_TYPE,
    isArray: false,
    example: COMPANY_TYPE.PRIVATELY_HELD,
  })
  @IsOptional()
  @IsEnum(COMPANY_TYPE)
  company_type: COMPANY_TYPE;

  @ApiProperty()
  @IsOptional()
  location: string;

  @IsOptional()
  user: User
}
