import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LoginDto, SignUpDto } from 'src/dto/auth-dto';
import { ApiTags, ApiConsumes, ApiHeader, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  
  @ApiConsumes('application/json')
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() body: LoginDto) {
    return this.authService.signIn(body.name, body.password);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @ApiConsumes('application/json')
  @Post('signup')
  signUp(@Body() body: SignUpDto){
    return this.authService.signUp(body.email, body.name, body.password)
  }
}