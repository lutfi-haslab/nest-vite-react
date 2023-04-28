import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async signIn(name, pass) {
    const user = await this.usersService.loginUser(name, pass);
    // if (user?.password !== pass) {
    //   throw new UnauthorizedException();
    // }
    const payload = { name: user.name, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(email, name, password) {
    const user = await this.usersService.createUser(email, name, password);

    return {
      user
    }
  }
}