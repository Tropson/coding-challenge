import { Injectable,Inject } from '@nestjs/common';
import {ClientProxy} from '@nestjs/microservices';

@Injectable()
export class AppService {

  constructor(@Inject('WORKER_SERVICE') private readonly clientProxy:  ClientProxy) { }

  getHello(): string {
    return 'Hello World!';
  }

  startWorker():void{
    this.clientProxy.emit('startWorker',JSON.stringify({data:""}))
  }

  stopWorker():void{
    this.clientProxy.emit('stopWorker',JSON.stringify({data:""}))
  }
}
