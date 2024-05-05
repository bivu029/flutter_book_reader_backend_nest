import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt.gurd';
import { Roles } from 'src/core/common/decorators/role.decorator';
import { Role } from 'src/core/enum/role/role.enum';
import { GoogleAuthGuard } from 'src/auth/googleauth.gurd';

@Controller({ path: 'user', version: '1' })

export class UserController {
  constructor(private readonly userService: UserService) { }

  @UseGuards(GoogleAuthGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {


    return this.userService.create(createUserDto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.USER)
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN,Role.USER)
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.userService.remove(id);


  }

  @Roles(Role.ADMIN,)
  @UseGuards(JwtAuthGuard)
  @Patch('blocstatus')
  isblocUser(@Param("id") id: string, @Body('blocstatus') blocstatus: boolean) {
    return this.userService.isblocUser(id, blocstatus);
  };



}
