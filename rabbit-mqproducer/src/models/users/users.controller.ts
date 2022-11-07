import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { getRedisClient } from '../../config/redis/redis-client';
// import { RabbitMQ_Client } from 'src/common/rabbitmq_connection';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @Inject('Users') private client: ClientProxy,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    let result;
    let totalUsers = [createUserDto];

    const redisClient = await getRedisClient();
    const users = JSON.parse(await redisClient.get('users'));

    console.log(users);

    if (users && users.length > 0) {
      const usersWithOutIds = users.map((user) => ({
        name: user.name,
      }));
      totalUsers = [...totalUsers, ...usersWithOutIds];
    }
    this.client.emit('create-user', totalUsers);

    let connection = '';
    try {
      connection = await this.client['connection'];
    } catch (e) {
      console.log('failed0');
      const allUsers = users ? users : [];
      result = await redisClient.set(
        'users',
        JSON.stringify([...allUsers, createUserDto]),
      );
      connection = 'error';
      // return this.usersService.create(createUserDto);
    }

    if (connection === 'failed') {
      console.log('failed1');
      const allUsers = users ? users : [];
      result = await redisClient.set(
        'users',
        JSON.stringify([...allUsers, createUserDto]),
      );
      // return this.usersService.create(createUserDto);
    } else if (users && connection !== 'error' && users.length > 0) {
      result = await redisClient.del('users');
      // return this.usersService.remove(users);
    }
    await redisClient.disconnect();
    return result;
  }

  async onApplicationBootstrap() {
    try {
      await this.client.connect();
    } catch (error) {
      console.log('connection failed');
    }
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
