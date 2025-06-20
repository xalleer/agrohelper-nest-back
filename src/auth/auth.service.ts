import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './entities/user.entity';
import { LoginDto } from './dto/login.dto';



@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async register(dto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        phone: dto.phone,
        type: dto.type,
        name: dto.name,
      }
    });


    return {
      token: this.generateToken(user),
      user: new UserEntity(user),
    };


  }

  async login(dto: LoginDto){
    const where = dto.email
      ? { email: dto.email }
      : { phone: dto.phone };

    const user = await this.prisma.user.findUnique({ where });

    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }


    return {
      token: this.generateToken(user),
      user: new UserEntity(user),
    }
  }

  private generateToken(user: UserEntity): string {
    const payload = { id: user.id, type: user.type };
    return this.jwtService.sign(payload);
  }
}