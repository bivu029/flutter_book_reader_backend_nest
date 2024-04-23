import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import {  ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigsModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './core/common/gurd/roles.gurd';
@Module({
  imports: [UserModule,
   ConfigsModule,
    MongooseModule.forRootAsync({
      imports:[ConfigsModule],
      useFactory:(configservice:ConfigService)=>({uri :configservice.get<string>("MONGO_URL")}),
      inject:[ConfigService]
    }),
    AuthModule,

  ],
  controllers: [AppController],
  providers: [AppService,

    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
