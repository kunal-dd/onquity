import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UserProfile from 'src/users/entities/user-profile.entity';
import User from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { UserProfileDto } from './dto/user-profile.dto';
import { IUserProfile } from './interfaces/user.interface';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectRepository(UserProfile)
    private readonly userProfileRepository: Repository<UserProfile>,
  ) {}

  public async get(user: User) : Promise<IUserProfile> {
    let profile = await this.userProfileRepository.findOne({ user: user });

    let returnProfile: IUserProfile;
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

  public async saveUserProfile(
    userProfileDto: UserProfileDto,
    user: User,
  ): Promise<UserProfile> {
    try {
      userProfileDto.user = user;
      const startupCreated = await this.userProfileRepository.save(
        userProfileDto,
      );
      delete startupCreated.user;

      return startupCreated;
    } catch (err) {
      throw new HttpException(
        'User profile has already added for this user',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async updateUserProfile(
    currentUser: User,
    updateUserProfileDto: UpdateUserProfileDto,
  ): Promise<UserProfile> {
    try {
      const startupProfile = await this.userProfileRepository.findOne({
        user: currentUser,
      });
      let update = Object.assign(startupProfile, updateUserProfileDto);
      return await this.userProfileRepository.save(update);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
