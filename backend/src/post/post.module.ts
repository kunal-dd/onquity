import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Post from './entities/post.entity';
import { RedisCacheModule } from 'src/redis-cache/redis-cache.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), RedisCacheModule],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
