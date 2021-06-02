import { Controller, Delete, Get,Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
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
}
