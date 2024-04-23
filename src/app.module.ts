import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import {  ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigsModule } from './config/config.module';
@Module({
  imports: [UserModule,
   ConfigsModule,
    MongooseModule.forRootAsync({
      imports:[ConfigsModule],
      useFactory:(configservice:ConfigService)=>({uri :configservice.get<string>("MONGO_URL")}),
      inject:[ConfigService]
    }),

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
