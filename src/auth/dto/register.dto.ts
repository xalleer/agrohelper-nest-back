import { IsEmail, IsEnum, IsNotEmpty, IsPhoneNumber, Length, MinLength, ValidateIf } from 'class-validator';
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

  @ValidateIf((o) => o.type === UserType.INDIVIDUAL)
  @IsNotEmpty()
  name?: string;

  @ValidateIf((o) => o.type === UserType.FARM)
  @IsNotEmpty()
  farmName?: string;

  @ValidateIf((o) => o.type === UserType.FARM)
  @IsNotEmpty()
  contactName?: string;

  @ValidateIf((o) => o.type === UserType.FARM)
  @IsNotEmpty()
  contactPosition?: string;
}