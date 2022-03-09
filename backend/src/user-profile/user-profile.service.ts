import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UserProfile from 'src/users/entities/user-profile.entity';
import User from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { UserProfileDto } from './dto/user-profile.dto';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectRepository(UserProfile)
    private readonly userProfileRepository: Repository<UserProfile>,
  ) {}

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
