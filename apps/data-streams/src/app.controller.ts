import { Controller, Delete, Get,Post } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { AppService } from './app.service';

var data = null;

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData(): string {
    return JSON.parse(data);
  }

  @Post('/worker')
  startWorker(): string{
    this.appService.startWorker();
    return "Worker started";
  }

  @Delete('/worker')
  stopWorker(): string{
    this.appService.stopWorker();
    return "Worker stopped";
  }

  @EventPattern("data")
  handleDataEvent(@Payload() payload,@Ctx() context:RmqContext){
    console.log("Incoming data");
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    data=payload;
    channel.ack(originalMsg);
  }
}
