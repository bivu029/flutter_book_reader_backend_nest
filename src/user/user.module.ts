import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.entity';
import { BookConstant } from 'src/core/constants/const';
import { MongoUserService } from './database/usermongo.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature(

      [
        { name: BookConstant.usercollection, schema: UserSchema },

      ],

    ),
    
  ],
  controllers: [UserController],
  providers: [UserService, MongoUserService],
  exports:[MongoUserService]
})
export class UserModule { }
