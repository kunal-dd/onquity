import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import User from './entities/user.entity';
import { IUsers } from './interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import UserSessions from './entities/user-sessions.entity';
import { UserSessionDto } from './dto/user-session.dto';
import { UpdateUserSessionDto } from './dto/update-user-session';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserSessions)
    private readonly userSessionRepository: Repository<UserSessions>,
  ) {}

  public async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      select: [
        'id',
        'email',
        'password',
        'full_name',
        'mobile_no',
        'profile_uid',
        'hashed_refresh_token',
        'role',
      ],
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new NotFoundException(`User ${email} not found`);
    }

    return user;
  }

  public async findByEmailOrMobile(
    email: string,
    mobile: string,
  ): Promise<boolean> {
    const user = await this.userRepository.find({
      where: [{ email: email }, { mobile_no: mobile }],
    });

    if (user.length === 0) {
      return false;
    }

    return true;
  }

  public async findById(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: ['user_profile', 'startup_profile'],
    });

    if (!user) {
      throw new NotFoundException(`User #${userId} not found`);
    }

    return user;
  }

  public async create(userDto: UserDto): Promise<IUsers> {
    try {
      return await this.userRepository.save(userDto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async validateUserByEmailAndOtp(email, otp): Promise<IUsers> {
    const user = await this.userRepository.findOne({
      where: {
        email,
        reset_password_otp: otp,
      },
    });

    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    return user;
  }

  public async updateUser(data): Promise<User> {
    try {
      return await this.userRepository.save(data);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async updateByPassword(
    email: string,
    password: string,
  ): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ email: email });
      user.password = bcrypt.hashSync(password, 8);

      return await this.userRepository.save(user);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async updateRefreshToken(token: string, email: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ email: email });
      user.hashed_refresh_token = token;

      return await this.userRepository.save(user);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async startSession(user: User): Promise<any> {
    try {
      const sessionData: UserSessionDto = {
        session_started: new Date(),
        session_ended: null,
        user: user,
      };
      return await this.userSessionRepository.save(sessionData);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async endSession(session_id: string) {
    try {
      const id = parseInt(session_id);
      const currentSession = await this.userSessionRepository.findOne({ id });
      const sessionData: UpdateUserSessionDto = {
        session_started: currentSession.session_started,
        session_ended: new Date(),
      };

      let update = Object.assign(currentSession, sessionData);
      return await this.userSessionRepository.save(update);

    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
