import { Module } from '@nestjs/common';
import { ConfigModule,  } from '@nestjs/config';
@Module({
 imports:[
    ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: '.local.env',
      }),
 ]
})
export class ConfigsModule {}
