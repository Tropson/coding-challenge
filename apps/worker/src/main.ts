import { NestFactory } from '@nestjs/core';
import { WorkerModule } from './worker.module';
import { MicroserviceOptions,Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(WorkerModule, {
    transport:Transport.RMQ,
    options:{
      urls:[process.env.RABBITMQ_URL],
      noAck:false,
      queue:'worker_queue',
      queueOptions:{
        durable:true
      }
    }
  });
  app.listen(async () => {
    console.log('Microservice is listening');
  });
}
bootstrap();
