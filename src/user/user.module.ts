import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.entity';
import { BookConstant } from 'src/core/constants/const';
import { MongoUserService } from './database/usermongo.service';

@Module({
  imports: [
    MongooseModule.forFeature(

      [
        { name: BookConstant.usercollection, schema: UserSchema },

      ],

    ),
    
  ],
  controllers: [UserController],
  providers: [UserService, MongoUserService],
})
export class UserModule { }
