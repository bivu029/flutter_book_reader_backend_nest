import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigsModule } from 'src/config/config.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
@Module({
  imports:[
    ConfigsModule, //for getting .local.env file 
    PassportModule,
    JwtModule.registerAsync({
      imports:[ ConfigsModule],
      useFactory: async (configService: ConfigService) => ({ 
        secret: configService.get<string>('JWT_SECRET_KEY'), //this is key from .local.env 
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService,JwtStrategy],
  exports:[AuthService]
})
export class AuthModule {}
