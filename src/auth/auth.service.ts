import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './entities/user.entity';
import { UserType } from '@prisma/client';
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
        name: dto.type === UserType.INDIVIDUAL ? dto.name : undefined,
        farmName: dto.type === UserType.FARM ? dto.farmName : undefined,
        contactName: dto.type === UserType.FARM ? dto.contactName : undefined,
        contactPosition: dto.type === UserType.FARM ? dto.contactPosition : undefined,
      }
    });

    const userResponse: any = {
      email: dto.email,
      type: dto.type,
      phone: dto.phone,
    };

    if (dto.type === UserType.INDIVIDUAL && dto.name !== undefined) {
      userResponse.name = dto.name;
    }

    if (dto.type === UserType.FARM) {
      if (dto.farmName !== undefined) userResponse.farmName = dto.farmName;
      if (dto.contactName !== undefined) userResponse.contactName = dto.contactName;
      if (dto.contactPosition !== undefined) userResponse.contactPosition = dto.contactPosition;
    }

    return {
      token: this.generateToken(user),
      user: new UserEntity(userResponse),
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