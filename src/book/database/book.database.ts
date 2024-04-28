import { HttpException,HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BookConstant } from 'src/core/constants/const';
import { AuthorSchema, Book, BookDocument, ChapterListSchema, ChapterSchema, GenreSchema, SubGenreSchema, authorSerializer, bookSerializer,  chapterListSerializer,  chapterSerializer, genreSerializer, subGenreSerializer } from '../schema/book.schema';
import { Model } from 'mongoose';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';

@Injectable()

export class BookDataBaseService {
    constructor(@InjectModel(BookConstant.bookscollection) private bookmodel: Model<Book>) {
        this.bookmodel.schema.set('toObject', { transform: bookSerializer });
        this.bookmodel.schema.set('toJSON', { transform: bookSerializer });
        GenreSchema.set('toObject', { transform: genreSerializer });
        GenreSchema.set('toJSON', { transform: genreSerializer });
        SubGenreSchema.set('toObject', { transform: subGenreSerializer });
        SubGenreSchema.set('toJSON', { transform: subGenreSerializer });
        ChapterSchema.set('toObject', { transform: chapterSerializer });
        ChapterSchema.set('toJSON', { transform: chapterSerializer });
        ChapterListSchema.set('toObject', { transform: chapterListSerializer });
        ChapterListSchema.set('toJSON', { transform: chapterListSerializer });
        AuthorSchema.set('toObject', { transform: authorSerializer });
        AuthorSchema.set('toJSON', { transform: authorSerializer });
    }

    //create book
    async create(createBookDto: CreateBookDto): Promise<BookDocument> {
        try {
         
          
            const book = await this.bookmodel.create(createBookDto);
            
            
            return book;
        } catch (error) {
          console.log(error);
          
            throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //find book by id
    async findOne(id: string): Promise<BookDocument> {
        try {
            const book = await this.bookmodel.findOne({id:id});
           
            
            

            return book;
        } catch (error) {
            if (error.name === 'CastError') {
                throw new HttpException('Invalid user input, please check input data', HttpStatus.BAD_REQUEST);
            } else if (error.name === 'NotFoundException') {
                throw new HttpException('No book Found', HttpStatus.NOT_FOUND);
            } else {
                throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        };
    }


    //find book max 10 search 
   async findAll( searchQuery?: string,
        page: number = 1,
        limit: number = 10,):Promise<BookDocument[]> {
          try {
            const skip = (page - 1) * limit;
            const query = searchQuery
              ? { title: { $regex: searchQuery, $options: 'i' } }
              : {};
       const data= await this.bookmodel.find(query).skip(skip).limit(limit).exec();
       if (data == null) {
        throw new NotFoundException("no user exist")
    }
       return data;
          } catch (error) {
            if (error.name === 'NotFoundException') {
                throw new HttpException('No book Found', HttpStatus.NOT_FOUND);
              } else {
                throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
              }
          }
    }

    async findbytitle(title:string):Promise<BookDocument>{
      return await this.bookmodel.findOne({title:title});
    }


    //update book 
   async update(id: string, updateBookDto: UpdateBookDto) :Promise<BookDocument> {
        try {
            const updatedBook = await this.bookmodel
            .findOneAndUpdate({ id: id }, { $set: updateBookDto }, { new: true })
            .exec();
        
          if (!updatedBook) {
            throw new NotFoundException(`User with ID ${id} not found`);
          }
        
          return updatedBook;
          } catch (error) {
            if (error.name === 'CastError') {
              throw new HttpException('Invalid book input, please check input data', HttpStatus.BAD_REQUEST);
            } else if (error.name === 'NotFoundException') {
              throw new HttpException('No book Found', HttpStatus.NOT_FOUND);
            } else {
              throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
            }
          }
    }


    //remove book 
 async   remove(id: string):Promise<boolean> {
        try {
            const deletedbook = await this.bookmodel.findOneAndDelete({ id: id }).exec();
            if (!deletedbook) {
              throw new NotFoundException('book not found');
            }
            return !!deletedbook;
          } catch (error) {
            console.log(error.name);
            if (error.name === 'CastError') {
              throw new HttpException('Invalid book input, please check input data', HttpStatus.BAD_REQUEST);
            } else if (error.name === 'NotFoundException') {
              throw new HttpException('No book Found', HttpStatus.NOT_FOUND);
            } else {
              throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
            }
          }
    }

    //search by genre
    async searchByGenre(genreName: string): Promise<Book[]> {
     try {
    
      console.log("DATABASE CALLED");
      
      const query =  {'genres.name': { $regex: genreName, $options: 'i' } };
      console.log(query);
      
      return this.bookmodel.find(query).exec();
     } catch (error) {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
     }
    }
    //editor choice
    async findEditorsChoice(): Promise<any> {
   try {
    return this.bookmodel.find({ editorChoice: true }).exec();
   } catch (error) {
    throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
   }
    }

      // New findTrendingBooks method
  async findTrendingBooks(): Promise<Book[]> {
  try {
    return this.bookmodel.find({
      isHot: true,
      rating: { $gte: 4.5 },
      likeCount: { $gt: 100 }
    }).exec();
  } catch (error) {
    throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
  }
  }
}