import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Post from './entities/post.entity';
import { IPost } from './interfaces/post.interface';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
  ) {}
  public async create(createPostDto, user): Promise<IPost> {
    try {
      createPostDto.user = user;
      const save = await this.postRepository.save(createPostDto);

      // Modify this process
      delete save.user;
      delete save.createdAt;
      delete save.updatedAt;

      return save;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async getSinglePost(postId) {
    const post = await this.postRepository.findOne({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new NotFoundException();
    }

    return post;
  }

  public async delete(postId) {
    const post = await this.postRepository.findOne({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new NotFoundException();
    }

    try {
      await this.postRepository.delete({ id: postId });

      return {
        message: 'Deleted successfully',
        status: 200,
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async update(postId, updatePostDto, user) {
    try {
      const post = await this.postRepository.findOne({
        id: postId,
        user
      });

      if (!post) {
        throw new NotFoundException();
      }

      let update = Object.assign(post, updatePostDto);
      return await this.postRepository.save(update);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
