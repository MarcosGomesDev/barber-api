import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':userId')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('userId') userId: string) {
    return this.userService.findById(userId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: CreateUserDTO) {
    return this.userService.create(body);
  }

  @Delete(':userId')
  @HttpCode(HttpStatus.OK)
  delete(@Param('userId') userId: string) {
    return this.userService.delete(userId);
  }
}
