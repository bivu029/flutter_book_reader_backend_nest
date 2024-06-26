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
import { BookModule } from './book/book.module';
import { CacheModule } from '@nestjs/cache-manager';
import { AnalysisModule } from './analysis/analysis.module';
@Module({
  imports: [UserModule,
   ConfigsModule,
    MongooseModule.forRootAsync({
      imports:[ConfigsModule],
      useFactory:(configservice:ConfigService)=>({uri :configservice.get<string>("MONGO_URL")}),
      inject:[ConfigService]
    }),
    AuthModule,
    BookModule,
    CacheModule.register({ isGlobal: true,ttl:36000*5}),
    AnalysisModule

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
