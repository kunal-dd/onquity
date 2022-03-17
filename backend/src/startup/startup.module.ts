import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import StartupProfile from 'src/users/entities/startup-profile.entity';
import { StartupController } from './startup.controller';
import { StartupService } from './startup.service';

@Module({
  imports: [TypeOrmModule.forFeature([StartupProfile])],
  controllers: [StartupController],
  providers: [StartupService],
})
export class StartupModule {}
