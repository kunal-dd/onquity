import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import StartupProfile from 'src/users/entities/startup-profile.entity';
import User from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { StartupProfileDto } from './dto/startup-profile.dto';
import { UpdateStartupProfileDto } from './dto/update-startup-profile.dto';
import { IStartupProfile } from './interfaces/startup.interface';

@Injectable()
export class StartupService {
  constructor(
    @InjectRepository(StartupProfile)
    private readonly startupProfileRepository: Repository<StartupProfile>,
  ) {}

  public async get(user: User) : Promise<IStartupProfile> {
    let profile = await this.startupProfileRepository.findOne({ user: user });

    let returnProfile: IStartupProfile;
    let iProfile = Object.assign(profile, returnProfile);
   
    var filled = 0;
    for(let k in profile) {
      if(iProfile.hasOwnProperty(k)) {
        if(iProfile[k] != null && iProfile[k] != ""){
          filled++;
        }
      }
    } 

    iProfile.profile_completion = ((filled / Object.keys(iProfile).length)*100).toFixed(2)
    return iProfile;
  }

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
      throw new HttpException(
        'Startup profile has already added for this user',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async update(
    currentUser: User,
    updateStartupProfileDto: UpdateStartupProfileDto,
  ): Promise<StartupProfile> {
    try {
      const startupProfile = await this.startupProfileRepository.findOne({
        user: currentUser,
      });
      let update = Object.assign(startupProfile, updateStartupProfileDto);
      return await this.startupProfileRepository.save(update);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
