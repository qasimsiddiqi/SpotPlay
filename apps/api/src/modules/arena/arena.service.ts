import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateArenaDto } from './dto/register-arena.dto';

@Injectable()
export class ArenaService {
  constructor(private prisma: PrismaService) {}

  async create(arenaDto: CreateArenaDto) {
    const existingArena = await this.prisma.arena.findFirst({
      where: { name: arenaDto.name },
    });
    if (existingArena) {
      throw new ConflictException('Arena name already in use');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: arenaDto.ownerId },
    });

    if (!user) {
      throw new NotFoundException('Owner user not found');
    }

    if (user && user.role !== 'VENDOR') {
      throw new UnauthorizedException(
        'Only users with VENDOR role can register an arena',
      );
    }

    const data: CreateArenaDto = {
      name: arenaDto.name,
      address: arenaDto.address,
      city: arenaDto.city || 'Lahore',
      area: arenaDto.area,
      description: arenaDto.description,
      status: 'PENDING',
      ownerId: arenaDto.ownerId,
    };

    const createArena = await this.prisma.arena.create({ data });

    return createArena;
  }
}
