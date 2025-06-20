import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { GetUser } from '../common/decorators/get-user.decorator';
import { User } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@GetUser() user: User): Promise<User> {
    return user;
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Omit <User, "password">> {
    return this.userService.getUserById(id)
  }
}