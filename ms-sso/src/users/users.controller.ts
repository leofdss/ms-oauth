import { Controller, Post, Patch, Delete, Body, Param, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('sub')
  async sub(@Body() body: any) {
    return this.usersService.sub(body)
  }

  @Post()
  async createUser(@Body() user: any) {
    return this.usersService.createUser(user);
  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() user: any) {
    return this.usersService.updateUser(id, user);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }

  @Get(":id")
  async getUsers(@Param('id') id: string) {
    return this.usersService.getUser(id);
  }

  @Get()
  async listUsers() {
    return this.usersService.listUsers();
  }
  
}
