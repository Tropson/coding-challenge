import { Injectable,Inject } from '@nestjs/common';
import {ClientProxy} from '@nestjs/microservices';
import * as redis from 'redis';

const redisClient = redis.createClient({
  host: 'redis-server',
  port: 6379
})

@Injectable()
export class AppService {

  constructor(@Inject('WORKER_SERVICE') private readonly clientProxy:  ClientProxy) { }

  getData():Promise<string>{
    return new Promise((resolve,reject)=>{
      redisClient.get('data',(e,d)=>{
        if(e) reject(e);
        else resolve(d);
      })
    })
   
  }

  persistData(data){
    redisClient.set('data',data)
  }

  startWorker():void{
    this.clientProxy.emit('startWorker',JSON.stringify({data:""}))
  }

  stopWorker():void{
    this.clientProxy.emit('stopWorker',JSON.stringify({data:""}))
  }
}
