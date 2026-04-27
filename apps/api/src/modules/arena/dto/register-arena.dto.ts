import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsArray,
  IsEnum,
  IsUUID,
} from 'class-validator';
import { ArenaStatus } from '@prisma/client';

export class CreateArenaDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  address!: string;

  @IsString()
  @IsOptional()
  city?: string; // Defaults to "Lahore" in Prisma, but can be overridden

  @IsString()
  @IsNotEmpty()
  area!: string;

  @IsNumber()
  @IsOptional()
  latitude?: number;

  @IsNumber()
  @IsOptional()
  longitude?: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  facilities?: string[];

  @IsEnum(ArenaStatus)
  status!: ArenaStatus;

  @IsString()
  @IsOptional()
  rejectionReason?: string;

  @IsUUID()
  @IsNotEmpty()
  ownerId!: string;
}
