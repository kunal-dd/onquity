import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { winstonOptions } from './app-logging';
import { WinstonModule } from 'nest-winston';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from './mailer/mailer.module';
import { ChangePasswordModule } from './change-password/change-password.module';
import { ForgotPasswordModule } from './forgot-password/forgot-password.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.dev', '.env.stage', '.env.prod'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_MYSQL_HOST'),
        port: configService.get<number>('DB_MYSQL_PORT'),
        username: configService.get<string>('DB_MYSQL_USER'),
        password: configService.get<string>('DB_MYSQL_PASSWORD'),
        database: configService.get<string>('DB_MYSQL_DATABASE'),
        autoLoadEntities: true,
        synchronize: true,
        logging: false,
        entities: ['dist/**/*.entity.js'],
        migration: ['dist/migrations/**/*.js'],
        subscribers: ['dist/subscribers/**/*.js'],
        cli: {
          migrationsDir: 'src/migrations',
          subscribersDir: 'src/subscribers',
        },
      }),
    }),
    WinstonModule.forRoot(winstonOptions),
    UsersModule,
    AuthModule,
    MailerModule,
    ChangePasswordModule,
    ForgotPasswordModule,
  ],
})
export class AppModule {}
