import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':userId')
  findOne(@Param('userId') userId: string) {
    return this.userService.findById(userId);
  }

  @Post()
  create(@Body() body: CreateUserDTO) {
    return this.userService.create(body);
  }

  @Delete(':userId')
  delete(@Param('userId') userId: string) {
    return this.userService.delete(userId);
  }
}
