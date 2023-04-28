import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Render,
  Req,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { diskStorage } from 'multer';
import { Post as PostModel, User as UserModel } from '@prisma/client';
import { FastifyReply } from 'fastify';
import { AppService } from './app.service';
import { PostService } from './post.service';
import { UserService } from './user.service';
import { MultipleFileDto } from './dto/multiple-files-dto';
import { SingleFileDto } from './dto/single-file-dto';
import { FastifyFileInterceptor } from './interceptor/fastify-file-interceptor';
import { FastifyFilesInterceptor } from './interceptor/fastify-files-interceptor';
import { fileMapper, filesMapper } from './utils/file-mapper';
import { editFileName, imageFileFilter } from './utils/file-upload-util';

@Controller()
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService,
    private readonly appService: AppService,
  ) {
  }

  @ApiTags('Upload File')
  @ApiConsumes('multipart/form-data')
  @Post('single-file')
  @UseInterceptors(
    FastifyFileInterceptor('photo_url', {
      storage: diskStorage({
        destination: './upload/single',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  single(
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: SingleFileDto,
  ) {
    return { ...body, photo_url: file };
  }

  @ApiTags('Upload File')
  @ApiConsumes('multipart/form-data')
  @Post('multiple-file')
  @UseInterceptors(
    FastifyFilesInterceptor('photo_url', 10, {
      storage: diskStorage({
        destination: './upload/single',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  multiple(
    @Req() req: Request,
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: MultipleFileDto,
  ) {
    return { ...body, photo_url: filesMapper({ files, req }) };
  }

  @Get('/test')
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiTags('hello-world')
  @Get('/test2')
  @Render('index.hbs')
  getTest2(): any {
    return { message: 'Hello world!' };
  }


  @Get('post/:id')
  async getPostById(@Param('id') id: string): Promise<PostModel> {
    return this.postService.post({ id: Number(id) });
  }

  @Get('feed')
  async getPublishedPosts(): Promise<PostModel[]> {
    return this.postService.posts({
      where: { published: true },
    });
  }

  @Get('filtered-posts/:searchString')
  async getFilteredPosts(
    @Param('searchString') searchString: string,
  ): Promise<PostModel[]> {
    return this.postService.posts({
      where: {
        OR: [
          {
            title: { contains: searchString },
          },
          {
            content: { contains: searchString },
          },
        ],
      },
    });
  }

  @Post('post')
  async createDraft(
    @Body() postData: { title: string; content?: string; authorEmail: string },
  ): Promise<PostModel> {
    const { title, content, authorEmail } = postData;
    return this.postService.createPost({
      title,
      content,
      author: {
        connect: { email: authorEmail },
      },
    });
  }

  // @Post('user')
  // async signupUser(
  //   @Body() userData: { name?: string; email: string, password: string },
  // ): Promise<UserModel> {
  //   return this.userService.createUser(userData);
  // }

  @Put('publish/:id')
  async publishPost(@Param('id') id: string): Promise<PostModel> {
    return this.postService.updatePost({
      where: { id: Number(id) },
      data: { published: true },
    });
  }

  @Delete('post/:id')
  async deletePost(@Param('id') id: string): Promise<PostModel> {
    return this.postService.deletePost({ id: Number(id) });
  }
}
