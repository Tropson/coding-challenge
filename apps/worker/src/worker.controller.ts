import { Controller } from '@nestjs/common';
import { WorkerService } from './worker.service';
import {Ctx, EventPattern, MessagePattern, RmqContext} from '@nestjs/microservices';

@Controller()
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}

  @EventPattern('startWorker')
  startInterval(@Ctx() context:RmqContext){
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    this.workerService.startInterval();
    channel.ack(originalMsg);
    console.log("Worker started");
  }

  @EventPattern('stopWorker')
  stopInterval(@Ctx() context:RmqContext){
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    this.workerService.stopInterval();
    channel.ack(originalMsg);
    console.log("Worker stopped");
  }
}
