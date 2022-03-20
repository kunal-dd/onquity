import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';
import {
  INDIVIDUAL_USER_TYPE,
  WORKPLACE_TYPE,
  WORK_COMMITMENT_TYPE,
} from 'src/utils/constant';

export class UpdatePostDto {
  @ApiProperty()
  @IsOptional()
  readonly post_title: string;

  @ApiProperty()
  @IsOptional()
  readonly categories: INDIVIDUAL_USER_TYPE[];

  @ApiProperty({
    enum: WORK_COMMITMENT_TYPE,
    isArray: false,
    example: WORK_COMMITMENT_TYPE.FULL_TIME,
  })
  @IsOptional()
  @IsEnum(WORK_COMMITMENT_TYPE)
  readonly work_commitment: WORK_COMMITMENT_TYPE;

  @ApiProperty({
    enum: WORKPLACE_TYPE,
    isArray: false,
    example: WORKPLACE_TYPE.HYBRID,
  })
  @IsOptional()
  @IsEnum(WORKPLACE_TYPE)
  readonly workplace: WORKPLACE_TYPE;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly description: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly equity: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly expertise: string [];
}
