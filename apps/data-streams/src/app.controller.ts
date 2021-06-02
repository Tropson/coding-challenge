import { Controller, Delete, Get,Post } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getData() {
    try{
      let data = await this.appService.getData();
      return JSON.parse(data);
    }
    catch(err){
      return err;
    }
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
    this.appService.persistData(payload);
    channel.ack(originalMsg);
  }
}
