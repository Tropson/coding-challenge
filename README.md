# Notes

## The solution
### Communication
As the internal communication protocol I used RabbitMQ. Firstly because it's a well built message queuing system that I have experience with and I know it is reliable and secondly because of the possibility to manually acknowledge messages. This makes it possible to implement fault tolerance, such as if the service is down and cannot consume the message, the message will still be persisted on the queue and sent to the consumer again when it becomes available again. This makes the data stream more stable.
### Storage
For storage I used Redis, which is an in-memory key-value pair store. Moreover, the data that needs to be stored is a simple response from the service, so it doesn't require extensive querying. Redis makes accessing and writing the data easy and fast, mainly because of the read/write speeds it can achieve by utilizing memory as its storage unit.
### Scheduling
For scheduling I used cron, mainly because of familiarity and because I find it more stable than using intervals in JavaScript.

## How to run
As the solution has been containerized and the Redis instance is running in docker, to run the soluton docker-compose can be used. A docker-compose.yml file is included in the repository which already includes everything needed to run the application.

To start both services, as well as the Redis instance run the following command:
```
docker-compose up
```
## Short-comings and future improvements
As this was my first time using NestJs (I have most of my experience in ExpressJS), I am sure that not all of the design principles were followed that NestJS would require. Similarly, tests are not included because of the shortage on time due to researching and learning NestJS while making the solution.

------------------------------------------------------------------------------------------------------------------------------------------------------------------
# Welcome to Welds coding-challenge

## Introduction
Here at Weld we use [NestJS](https://nestjs.com/) for our applications. So this project also reflects that. On our front-end we use NextJS and GraphQL. For simplicity we have used the monorepo structure from NestJS.

Fork this repository and create your own repository to get started.

## Challenge
One of our customers wants us to help them build a pipeline for Hubspot. And they want us to setup a new data-pipeline for them to get information out and into their current data-warehouse.

To accomplish this you will build two services:
- **Data-streams**: Our API that can receive calls and issue commands to **worker**. This service also stores any information that our customer wants to fetch.
- **Worker:** Fetches the data from Hubspot. Makes any transformations you see fit. And sends it back to **data-streams** for storage.

### Steps in challenge
- Configure a message protocol between the two services. You can get inspiration from the [nestjs docs.](https://docs.nestjs.com/microservices/basics) Choose which ever you want but tell us why in your answer.
- Create an endpoint on **data-streams** that tells **worker** to start fetching data on an interval (every 5 minutes).
- Setup an [http module](https://docs.nestjs.com/techniques/http-module) that **worker** can use to communicate with Hubspot. You can setup a [Hubspot developer account](https://developers.hubspot.com/) or mock the data. Depending on what you prefer.
- Send the data and store the results on **data-streams** using internal communication protocol.
- Make an endpoint on **data-streams** that can fetch the data stored on **data-streams**. Use whatever storage you see fit but tell us why you chose it.
- Make an endpoint on **data-streams** that can stop the data fetching on **worker**.

## How we evaluate
- We understand that this can be **time consuming**. If you are short on time leave something out. But be sure to tell us your approach to the problem in the documentation.
- A documented answer that explains your approach, short-comings, how-to-run and future work.
- A working solution. Preferably with some tests to give us an idea of how you write tests (you don't need to put it all under test).
- Reliability is very important when dealing with data-pipelines. So any measures you can add to keep the data-flowing will be appreciated.
- We appreciate small commits with a trail of messages that shows us how you work.

## Project structure
```
├── README.md
├── apps
│   ├── data-streams
│   └── worker
├── package.json
```
### data-streams:
This is our API. We will be able to issue HTTP requests to this and have it talk to our microservice **worker**.
We also store any information that **worker** sends our way. This project has been setup as a hybrid app. It can both function as an API but also as a microservice with an internal communication layer.

You can start data-streams with:
```
yarn start
```

### worker:
This is the worker microservice that is in charge of talking to the external API. It will fetch data when issued a command from **data-streams** and then return the results. This project only functions as a microservice which means it can only receive commands from the internal communication layer.

You can start worker with:
```
yarn start worker
```
