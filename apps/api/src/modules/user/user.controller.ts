import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Public()
  @Post('create')
  async create(@Body() userDto: UserDto) {
    return this.userService.create(userDto);
  }
}
