import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {Transport} from '@nestjs/microservices';
import * as dotenv from 'dotenv';
dotenv.config();


const initMicroservice = async (app: INestApplication) => {
  let rmq_url=process.env.RABBITMQ_URL;
  console.log(rmq_url);
  // Setup communication protocol here
  app.connectMicroservice({
    transport:Transport.RMQ,
    options:{
      urls:[rmq_url],
      queue:'data_queue',
      noAck:false,
      queueOptions:{
        durable:true
      }
    }
  });
  await app.startAllMicroservicesAsync();
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  initMicroservice(app);
  await app.listen(3000);
}
bootstrap();
