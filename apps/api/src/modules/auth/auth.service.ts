import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../user/user.service';
import { UserDto } from '../user/dto/user.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private userService: UserService,
    private configService: ConfigService,
  ) {}

  async register(dto: UserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const user = await this.userService.create({
      email: dto.email,
      password: dto.password,
      fullName: dto.fullName,
      userName: dto.userName,
      phone: dto.phone,
      role: dto.role,
      gender: dto.gender,
    });

    return this.login({ email: user.email, password: dto.password });
  }

  async login(dto: LoginDto) {
    console.log('Inside login function');
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Account is deactivated');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: '1m',
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
        expiresIn: '7d', // Long-lived
      }),
    ]);

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        userName: user.userName,
        role: user.role,
      },
    };
  }

  async refresh(refreshToken: string) {
    try {
      console.log('Refresh token string to proceed with: ', refreshToken);
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      console.log('Payload ---->> ', payload);

      const user = await this.prisma.user.findUnique({
        where: { email: payload.email },
      });

      if (!user || !user.isActive) {
        throw new UnauthorizedException('User not found or inactive');
      }

      const newPayload = { sub: user.id, email: user.email, role: user.role };

      const [accessToken, newRefreshToken] = await Promise.all([
        this.jwtService.signAsync(newPayload, {
          secret: this.configService.get('JWT_SECRET'),
          expiresIn: '1m',
        }),
        this.jwtService.signAsync(newPayload, {
          secret: this.configService.get('JWT_REFRESH_SECRET'),
          expiresIn: '7d', // Long-lived
        }),
      ]);

      return {
        accessToken: accessToken,
        refreshToken: newRefreshToken,
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          userName: user.userName,
          role: user.role,
        },
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async getCurrentUser(user: any) {
    if (!user) {
      throw new UnauthorizedException('No user found in request');
    }

    console.log('Request user from controller --->> ', user);

    const currentUser = await this.prisma.user.findUnique({
      where: { id: user.sub },
      select: {
        id: true,
        email: true,
        fullName: true,
        userName: true,
        role: true,
      },
    });

    if (!currentUser) {
      throw new UnauthorizedException('User not found');
    }

    return currentUser;
  }
}
