import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ClientsModule,Transport} from '@nestjs/microservices';
import * as dotenv from 'dotenv';
dotenv.config();
@Module({
  imports: [ClientsModule.register([
    { name: 'WORKER_SERVICE', transport: Transport.RMQ,options:{noAck:false,queue:'worker_queue',urls:[process.env.RABBITMQ_URL,]}},
   ]),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
