import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { Role, Gender } from '@prisma/client';

export class UserDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password!: string;

  @IsString()
  @IsNotEmpty()
  fullName!: string;

  @IsString()
  @IsNotEmpty()
  userName!: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsEnum(Role)
  @IsNotEmpty()
  role!: Role; // CUSTOMER or VENDOR (SUPERADMIN will be seeded manually)

  @IsEnum(Gender)
  @IsNotEmpty()
  gender!: Gender;
}
