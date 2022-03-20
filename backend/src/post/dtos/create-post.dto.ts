import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsString } from 'class-validator';
import {
  INDIVIDUAL_USER_TYPE,
  WORKPLACE_TYPE,
  WORK_COMMITMENT_TYPE,
} from 'src/utils/constant';

export class CreatePostDto {
  @ApiProperty()
  @IsString()
  readonly post_title: string;

  @ApiProperty()
  @IsArray()
  readonly categories: INDIVIDUAL_USER_TYPE[];

  @ApiProperty({
    enum: WORK_COMMITMENT_TYPE,
    isArray: false,
    example: WORK_COMMITMENT_TYPE.FULL_TIME,
  })
  @IsEnum(WORK_COMMITMENT_TYPE)
  readonly work_commitment: WORK_COMMITMENT_TYPE;

  @ApiProperty({
    enum: WORKPLACE_TYPE,
    isArray: false,
    example: WORKPLACE_TYPE.HYBRID,
  })
  @IsEnum(WORKPLACE_TYPE)
  readonly workplace: WORKPLACE_TYPE;

  @ApiProperty()
  @IsString()
  readonly description: string;

  @ApiProperty()
  @IsArray()
  readonly expertise: string [];

  @ApiProperty()
  @IsString()
  readonly equity: string;
}
