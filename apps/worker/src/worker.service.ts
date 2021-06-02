import { Injectable,HttpService,Inject } from '@nestjs/common';
import { CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import {ClientProxy} from '@nestjs/microservices';
import * as dotenv from 'dotenv';
dotenv.config();


const apiKey=process.env.HUBSPOT_KEY;
const url=`https://api.hubapi.com/contacts/v1/lists/all/contacts/recent?hapikey=${apiKey}`;

@Injectable()
export class WorkerService {

  constructor(
    @Inject('DATA_SERVICE') private readonly clientProxy:  ClientProxy,
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly httpService: HttpService
  ) { }

  startInterval() {
    const job = new CronJob(CronExpression.EVERY_5_SECONDS, this.queryApi.bind(this));
    this.schedulerRegistry.addCronJob("worker_cron", job);
    this.queryApi();
    job.start();
  }

  stopInterval() {
    this.schedulerRegistry.deleteCronJob("worker_cron");
  }

  async queryApi() {
    try{
      let resp = await this.httpService.get(url).toPromise();
      this.clientProxy.emit("data",JSON.stringify(resp.data));
      console.log("Outgoing data");
    }
    catch(err){
      console.log(err);
    }
  }
}
