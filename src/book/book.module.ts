import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';

import { BookDataBaseService } from './database/book.database';
import { MongooseModule } from '@nestjs/mongoose';
import { BookConstant } from 'src/core/constants/const';
import { BookSchema } from './schema/book.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[
    AuthModule,
    MongooseModule.forFeature(

      [
        { name: BookConstant.bookscollection, schema: BookSchema },

      ],

    ),
  ],
  controllers: [BookController],
  providers: [BookService,BookDataBaseService],
})
export class BookModule {}
