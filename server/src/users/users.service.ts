import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt'
// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async loginUser(name, password) {
    const user = await this.prisma.user.findFirst({
      where: {
        name
      }
    })

    if (user && bcrypt.compareSync(password, user.password)) {
      return user
    }
  }

  async createUser(email, name, password) {
    const hashedPassword = bcrypt.hashSync(password, 10);
    return await this.prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword
      }
    })
  }
}