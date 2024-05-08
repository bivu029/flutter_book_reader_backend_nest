import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookDataBaseService } from './database/book.database';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import * as fsExtra from 'fs-extra';
import * as path from 'path';
import * as fs from 'fs';
import { Readable } from 'stream';
import { ImageSavedException } from 'src/core/common/exception/exception';
import { Book } from './schema/book.schema';
@Injectable()
export class BookService {
  constructor(private bookdataservice:BookDataBaseService,
    @Inject(CACHE_MANAGER) private cacheService: Cache,

  ){}

  //create book
  async create(createBookDto: CreateBookDto):Promise<any> {
  
   
  const {id,title}=createBookDto;
   
  
 if (id != undefined) {
  const busexist= await this.bookdataservice.findOne(id);
  const titlexist= await this.bookdataservice.findbytitle(title)
  if (busexist) {
    throw new ConflictException("book already exist");
  }
  if (titlexist) {
    throw new ConflictException("book title already exist");
  }
 }
   
    return await this.bookdataservice.create(createBookDto);
  }

  async findAll( searchQuery?: string,
    page?: number,
    limit?: number ):Promise<any> {
    return await this.bookdataservice.findAll(searchQuery,page,limit);
  }
    async finadBookfromList(bookId: string[], page: number = 1, limit: number = 10):Promise<Book[]>{
      return await this.bookdataservice.getbookbyListId(bookId,page,limit);
    }

  async findOne(id: string) :Promise<any>{
    return await this.bookdataservice.findOne(id);
  }

  async update(id: string, updateBookDto: UpdateBookDto):Promise<any> {
    return  await this.bookdataservice.update(id,updateBookDto);
  }

  async  remove(id: string):Promise<any> {
    return await this.bookdataservice.remove(id);
  }
  async searchByGenre(genreName:string):Promise<any>{
    //check if data exist in cache  and return it
    const cachedData = await this.cacheService.get<any>(genreName);
    if (cachedData) {
      console.log(`Getting data from cache!`);
      return  cachedData;
    }

    // if not then get data from data base 
    const data= await this.bookdataservice.searchByGenre(genreName);
    await this.cacheService.set(genreName, data);
    return data ;
  }
async  findEditorsChoice():Promise<any>{
    // check if data is in cache:
 
    const cachedData = await this.cacheService.get<any>("editor");
     console.log(cachedData != null);

    if (cachedData) {
      console.log(`Getting data from cache!`);
      return  cachedData;
    }
    // if not, call database and set the cache:
  const data=await this.bookdataservice.findEditorsChoice();
  console.log('data set to cache',);
  await this.cacheService.set("editor", data);


  return data;
}

async trending():Promise<any>{
  const cachedData = await this.cacheService.get<any>("trend");
  if (cachedData) {
    console.log(`Getting data from cache!`);
    return  cachedData;
  }
   // if not, call database and set the cache:
   const data=await this.bookdataservice.findTrendingBooks();
   console.log('data set to cache',);
   await this.cacheService.set("trend", data)
  return data;
}


async saveBookImage(file: Express.Multer.File, userId: string, bookId: string): Promise<object> {
  const uploadDir = `./uploads/image/${userId}/bookimage`;
  let extension = '';
  let filename = '';

  try {
    // Ensure the upload directory exists
    await fsExtra.mkdir(uploadDir, { recursive: true });

    // Check if file and file.originalname are defined
    if (file && file.originalname) {
      extension = path.extname(file.originalname);
      filename = `${bookId}${extension}`;
    } else {
      throw new Error('Invalid file or filename');
    }

    const finalPath = path.join(uploadDir, filename);

    // Write the file using a stream
    const writeStream = fs.createWriteStream(finalPath);
    const readableStream = new Readable();
    readableStream.push(file.buffer);
    readableStream.push(null);
    readableStream.pipe(writeStream);

    // Return the file access URL
    const url=`http://localhost:3000/uploads/image/${userId}/bookimage/${filename}`;
    return  {url :url};
  } catch (error) {
    // Handle errors (e.g., log them, throw them, etc.)
    console.error('Error saving the book image:', error);
    throw  new ImageSavedException(); // Rethrow the error to be handled by the caller
  }
}
// In BookService

async getAllBookImages(): Promise<any> {
  const baseUploadDir = `./uploads/image`;
  try {
    const userDirs = await fsExtra.readdir(baseUploadDir);
    let allImageUrls = [];

    for (const userDir of userDirs) {
      const userUploadDir = path.join(baseUploadDir, userDir, 'bookimage');
      if (fsExtra.existsSync(userUploadDir)) {
        const files = await fsExtra.readdir(userUploadDir);
        const imageUrls = files.map(file => `http://localhost:3000/uploads/image/${userDir}/bookimage/${file}`);
        allImageUrls = allImageUrls.concat(imageUrls);
      }
    }
console.log('hjkh');

    return {"allimage":allImageUrls};
  } catch (error) {
    console.error('Error retrieving book images:', error);
    throw new NotFoundException('Images not found');
  }
}
}
