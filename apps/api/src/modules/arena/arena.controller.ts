import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { CreateArenaDto } from './dto/register-arena.dto';
import { ArenaService } from './arena.service';

@Controller('arena')
export class ArenaController {
  constructor(private arenaService: ArenaService) {}

  @Public()
  @Post('create')
  async create(@Body() arenaDto: CreateArenaDto) {
    return this.arenaService.create(arenaDto);
  }
}
