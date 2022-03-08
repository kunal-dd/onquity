import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import StartupProfile from 'src/users/entities/startup-profile.entity';
import User from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { StartupProfileDto } from './dto/startup-profile.dto';
import { IStartupProfile } from './interfaces/startup.interface';

@Injectable()
export class StartupService {
  constructor(
    @InjectRepository(StartupProfile)
    private readonly startupProfileRepository: Repository<StartupProfile>,
  ) {}

  public async create(
    startupProfileDto: StartupProfileDto,
    user: User,
  ): Promise<StartupProfile> {
    try {
      startupProfileDto.user = user;
      const startupCreated = await this.startupProfileRepository.save(
        startupProfileDto,
      );
      delete startupCreated.user;

      return startupCreated;
    } catch (err) {
      throw new HttpException("Startup profile has already added for this user", HttpStatus.BAD_REQUEST);
    }
  }
}
