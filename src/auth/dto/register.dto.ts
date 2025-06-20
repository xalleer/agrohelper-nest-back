import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber, Length, MinLength, ValidateIf } from 'class-validator';
import { UserType } from '@prisma/client';

export class RegisterDto {
  @IsEmail()
  email: string;

  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;

  @IsEnum(UserType)
  type: UserType;

  @IsNotEmpty()
  name: string;

  @ValidateIf(o => o.type === UserType.FARMER)
  @IsOptional()
  inviteCode?: string;
}