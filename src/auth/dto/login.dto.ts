import { IsEmail, IsNotEmpty, IsPhoneNumber, MinLength, ValidateIf } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ValidateIf((o) => !o.phone)
  @IsEmail()
  email?: string;

  @ValidateIf((o) => !o.email)
  phone?: string;
}