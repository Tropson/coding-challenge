import { Module,HttpModule } from '@nestjs/common';
import { WorkerController } from './worker.controller';
import { WorkerService } from './worker.service';
import {ScheduleModule} from '@nestjs/schedule';
import {ClientsModule,Transport} from '@nestjs/microservices';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    HttpModule,
    ScheduleModule.forRoot(),
    ClientsModule.register([
      { name: 'DATA_SERVICE', transport: Transport.RMQ,options:{noAck:false,queue:'data_queue',urls:[process.env.RABBITMQ_URL,]}},
     ]),
  ],
  controllers: [WorkerController],
  providers: [WorkerService],
})
export class WorkerModule {}
