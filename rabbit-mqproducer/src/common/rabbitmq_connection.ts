import { Client, Transport, ClientProxy } from '@nestjs/microservices';

export class RabbitMQ_Client {
  constructor(client) {
    this.client = client;
    this.client.connect();
  }

  @Client({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'users',
      noAck: false,
      queueOptions: {
        durable: false,
      },
    },
  })
  client: ClientProxy;

  rabbitMQ_Client = () => {
    return this.client;
  };
}
