import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { JwtAuthenticationGuard } from 'src/auth/guard/jwt.guard';
import { IUsers } from 'src/users/interfaces/user.interface';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { IPost } from './interfaces/post.interface';
import { PostService } from './post.service';

@ApiTags('posts')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthenticationGuard)
  @ApiBearerAuth()
  @Post()
  public async createPost(
    @Body(ValidationPipe) createPostDto: CreatePostDto,
    @GetUser() user: IUsers,
  ): Promise<IPost> {
    return this.postService.create(createPostDto, user);
  }

  @UseGuards(JwtAuthenticationGuard)
  @ApiBearerAuth()
  @Get('/:id')
  public async getSinglePost(@Param('id') postId: number): Promise<IPost> {
    return this.postService.getSinglePost(postId);
  }

  @UseGuards(JwtAuthenticationGuard)
  @ApiBearerAuth()
  @Put('/:id')
  public async updatePost(
    @Param('id') postId: number,
    @Body(ValidationPipe) updatePostDto: UpdatePostDto,
    @GetUser() user: IUsers,
  ): Promise<IPost> {
    return this.postService.update(postId, updatePostDto, user);
  }

  @UseGuards(JwtAuthenticationGuard)
  @ApiBearerAuth()
  @Delete('/:id')
  public async deletePost(@Param('id') postId: number): Promise<any> {
    return this.postService.delete(postId);
  }
}
