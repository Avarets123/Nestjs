import { ConfigModule, ConfigService } from '@nestjs/config';
import { IRMQServiceAsyncOptions } from 'nestjs-rmq';

export const rmqConfig: IRMQServiceAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    exchangeName: config.get('RMQ_EXCHANGE'),
    connections: [
      {
        login: config.get('RMQ_USER'),
        password: config.get('RMQ_PASS'),
        host: config.get('RMQ_HOSTNAME'),
      },
    ],
    queueName: config.get('RMQ_QUEUE'),
    prefetchCount: 32,
    serviceName: 'user-service',
  }),
};
