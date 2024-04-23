import { Module } from '@nestjs/common';
import { ConfigModule,  } from '@nestjs/config';
//this module use for get .env file data for security
@Module({
 imports:[
    ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: '.local.env',
      }),
 ]
})
export class ConfigsModule {}
