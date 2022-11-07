import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { userProviders } from './users.providers';
import { DatabaseModule } from 'src/config/database/database.module';
import { UsersRepository } from './users.repository';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'Users',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'users',
          maxConnectionAttempts: -1,
          noAck: false,
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
    DatabaseModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, ...userProviders],
})
export class UsersModule {}
