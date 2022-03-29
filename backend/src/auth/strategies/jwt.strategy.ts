import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from '../interface/jwt.payload';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { IUsers } from 'src/users/interfaces/user.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
  ) {
    super({
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('SECRET_KEY_JWT_ACCESS'),
    });
  }

  async validate(payload: JwtPayload): Promise<IUsers> {
    const { email } = payload;

    const user = await this.userService.findByEmail(email);

    if (!user || !user.hashed_refresh_token) {
      throw new UnauthorizedException();
    }

    let userRes;
    const res = Object.assign(user, userRes);
    res.session_id = payload.session_id
    return res;
  }
}
