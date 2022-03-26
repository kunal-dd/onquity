import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/mail/mail.service';
import User from 'src/users/entities/user.entity';
import { IUsers } from 'src/users/interfaces/user.interface';
import * as jwt from 'jsonwebtoken';

import { UsersService } from 'src/users/users.service';
import { ForgotPasswordDto } from './dtos/forgot-password.dto';
import { LoginDto } from './dtos/login.dto';
import { RegisterUserDto } from './dtos/register-user.dto';
import { JwtPayload } from './interface/jwt.payload';
import { generateRandomNumber } from '../utils/helper/random-number.helper';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
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

  async signOut(user: IUsers) {
    await this.updateRefreshTokenInUser(null, user.email);
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<any> {
    const user = await this.usersService.findByEmail(forgotPasswordDto.email);

    const otp = await generateRandomNumber(6, true);
    user.reset_password_otp = otp;
    const payload = {
      email: forgotPasswordDto.email,
      otp,
    };

    const forgotPasswordToken = await this.getForgotPasswordToken(payload);
    const url = `http://localhost:3000/change-password/token=${forgotPasswordToken}/key=${otp}`;
    console.log('URL :>', forgotPasswordToken);
    this.sendMailForgotPassword(user, url);

    return await this.usersService.updateUser(user);
  }

  async validateTokenAndKey(token: string, key: string) {
    // validate token and key
    const data: any = await jwt.verify(
      token,
      this.configService.get<string>('SECRET_KEY_JWT_FORGOT_PASSWORD'),
    );

    if (!data) {
      return {
        message: 'Authentication failed. Wrong password',
        status: 400,
      };
    }

    const verifyUser = await this.usersService.validateUserByEmailAndOtp(
      data.email,
      key,
    );
    if (!verifyUser) {
      return {
        message: 'Authentication failed. Wrong password',
        status: 400,
      };
    }

    const payload = {
      email: data.email,
    };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = await this.getRefreshToken(payload);

    await this.updateRefreshTokenInUser(refreshToken, data.email);

    return {
      accessToken,
      refreshToken,
    };
  }

  async resetPassword(changePasswordDto, user: IUsers) {
    changePasswordDto.password = bcrypt.hashSync(changePasswordDto.password, 8);
    user.password = changePasswordDto.password;

    return this.usersService.updateUser(user);
  }

  async updateRefreshTokenInUser(refreshToken: string, email: string) {
    if (refreshToken) {
      refreshToken = await bcrypt.hash(refreshToken, 10);
    }

    await this.usersService.updateRefreshToken(refreshToken, email);
  }

  public async getForgotPasswordToken(payload: JwtPayload) {
    const forgotPasswordToken = await this.jwtService.sign(payload, {
      secret: this.configService.get<string>('SECRET_KEY_JWT_FORGOT_PASSWORD'),
      expiresIn: this.configService.get<number>(
        'JWT_FORGOT_PASSWORD_EXPIRATION',
      ),
    });
    return forgotPasswordToken;
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
    this.mailService
      .sendWelcomeEmail(user)
      .then((response) => {
        console.log(response);
        console.log('User Registration: Send Mail successfully!');
      })
      .catch((err) => {
        console.log(err);
        console.log('User Registration: Send Mail Failed!');
      });
  }

  private sendMailForgotPassword(user, url): void {
    this.mailService
      .sendForgotPassword(user, url)
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
