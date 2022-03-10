import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { MailerService } from 'src/mailer/mailer.service';
import User from 'src/users/entities/user.entity';

import { UsersService } from 'src/users/users.service';
import { generateRandomNumber } from 'src/utils/helper';
import { LoginDto } from './dtos/login.dto';
import { RegisterUserDto } from './dtos/register-user.dto';
import { JwtPayload } from './interface/jwt.payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
  ) {}

  public async register(
    registerUserDto: RegisterUserDto,
  ): Promise<any | { status: number; message: string }> {
    const user = await this.usersService.findByEmailOrMobile(
      registerUserDto.email,
      registerUserDto.mobile_no,
    );

    if (user) {
      return {
        message: 'User already exist in the system!',
        status: 400,
      };
    }

    registerUserDto.password = bcrypt.hashSync(registerUserDto.password, 8);
    this.sendMailRegisterUser(registerUserDto);
    registerUserDto.profile_uid = await generateRandomNumber(6, true);

    await this.usersService.create(registerUserDto);
    const payload = {
      email: registerUserDto.email,
    };

    const accessToken = await this.getAccessToken(payload);
    const refreshToken = await this.getRefreshToken(payload);

    await this.updateRefreshTokenInUser(refreshToken, registerUserDto.email);

    const userResponse = {
      full_name: registerUserDto.full_name,
      email: registerUserDto.email,
      mobile_no: registerUserDto.mobile_no,
      role: registerUserDto.role,
    };

    return {
      accessToken,
      refreshToken,
      user: userResponse,
    };
  }

  public async login(
    loginDto: LoginDto,
  ): Promise<any | { status: number; message: string }> {
    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException();
    }

    console.log("loginDto -->", loginDto)
    console.log("user -->", user)

    const passwordIsValid = bcrypt.compareSync(
      loginDto.password,
      user.password,
    );

    if (!passwordIsValid == true) {
      return {
        message: 'Authentication failed. Wrong password',
        status: 400,
      };
    }

    const payload = {
      email: user.email,
    };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = await this.getRefreshToken(payload);

    await this.updateRefreshTokenInUser(refreshToken, user.email);

    const userResponse = {
      full_name: user.full_name,
      email: user.email,
      mobile_no: user.mobile_no,
      role: user.role,
    };

    return {
      accessToken,
      refreshToken,
      user: userResponse,
    };
  }

  async signOut(user: User) {
    await this.updateRefreshTokenInUser(null, user.email);
  }

  async updateRefreshTokenInUser(refreshToken: string, email: string) {
    if (refreshToken) {
      refreshToken = await bcrypt.hash(refreshToken, 10);
    }

    await this.usersService.updateRefreshToken(refreshToken, email);
  }

  public async getAccessToken(payload: JwtPayload) {
    const accessToken = await this.jwtService.sign(payload, {
      secret: this.configService.get<string>('SECRET_KEY_JWT_ACCESS'),
      expiresIn: this.configService.get<number>('JWT_ACCESS_EXPIRATION'),
    });
    return accessToken;
  }

  async getRefreshToken(payload: JwtPayload) {
    const refreshToken = await this.jwtService.sign(payload, {
      secret: this.configService.get<string>('SECRET_KEY_JWT_REFRESH'),
      expiresIn: this.configService.get<number>('JWT_REFRESH_EXPIRATION'),
    });
    return refreshToken;
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, email: string) {
    const user = await this.usersService.findByEmail(email);

    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.hashedRefreshToken,
    );

    if (isRefreshTokenMatching) {
      await this.updateRefreshTokenInUser(null, email);
      return user;
    } else {
      throw new UnauthorizedException();
    }
  }

  async getNewAccessAndRefreshToken(payload: JwtPayload) {
    const refreshToken = await this.getRefreshToken(payload);
    await this.updateRefreshTokenInUser(refreshToken, payload.email);

    return {
      accessToken: await this.getAccessToken(payload),
      refreshToken: refreshToken,
    };
  }

  private sendMailRegisterUser(user): void {
    this.mailerService
      .sendMail({
        to: user.email,
        from: 'from@example.com',
        subject: 'Registration successful ✔',
        text: 'Registration successful!',
        template: 'welcome',
        context: {
          title: 'Registration successfully',
          description:
            "You did it! You registered!, You're successfully registered.✔",
          user_name: user.full_name,
        },
      })
      .then((response) => {
        console.log(response);
        console.log('User Registration: Send Mail successfully!');
      })
      .catch((err) => {
        console.log(err);
        console.log('User Registration: Send Mail Failed!');
      });
  }
}
