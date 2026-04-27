import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma.service';
import * as bcrypt from 'bcryptjs';
import { Role } from '@prisma/client';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(userDto: UserDto) {
    // Check if user with the same email already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: userDto.email },
    });
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(userDto.password, 10);

    // Create the user in the database
    const user = await this.prisma.user.create({
      data: {
        email: userDto.email,
        password: hashedPassword,
        fullName: userDto.fullName,
        userName: userDto.userName,
        phone: userDto.phone,
        role: userDto.role,
        gender: userDto.gender,
      },
    });

    // Return the created user (excluding the password)
    const { password, ...result } = user;
    return result;
  }
}
