import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostService } from './post.service';
import { PrismaService } from './prisma.service';
import { UserService } from './user.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [AppController],
  providers: [PrismaService, PostService, AppService, UserService],
})
export class AppModule { }
