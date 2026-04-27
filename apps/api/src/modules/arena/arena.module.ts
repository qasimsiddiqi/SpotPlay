import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma.service';
import { ArenaController } from './arena.controller';
import { ArenaService } from './arena.service';

@Module({
  imports: [],
  controllers: [ArenaController],
  providers: [ArenaService, PrismaService],
  exports: [ArenaService],
})
export class ArenaModule {}
