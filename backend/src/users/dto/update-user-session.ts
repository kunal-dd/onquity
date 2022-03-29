import { MaxLength, IsString } from 'class-validator';
import User from '../entities/user.entity';

export class UpdateUserSessionDto {
  @IsString()
  @MaxLength(30)
  readonly session_started: Date;

  @IsString()
  readonly session_ended: Date;
}
