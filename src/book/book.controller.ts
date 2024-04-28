import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerconfig } from 'src/config/multer.configs';
import { JwtAuthGuard } from 'src/auth/jwt.gurd';
import { Roles } from 'src/core/common/decorators/role.decorator';
import { Role } from 'src/core/enum/role/role.enum';

@UseGuards(JwtAuthGuard)
@Controller({path:'book',version:"1"})
export class BookController {
  constructor(private readonly bookService: BookService) { }

 
  @Post(':userId/:bookId/upload')
  @UseInterceptors(FileInterceptor('file',multerconfig,))
  async uploadBookImage(
    
    @UploadedFile() file: Express.Multer.File,
    @Param('userId') userId: string,
    @Param('bookId') bookId: string
  ) {
    return this.bookService.saveBookImage(file, userId, bookId);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheKey("trending")
  @CacheTTL(3600 * 5)
  @Get("/trending")
  findtrending() {
    return this.bookService.trending();
  }
  @UseInterceptors(CacheInterceptor)
  @CacheKey("editorchoice")
  @CacheTTL(36000*5 )
  @Get("/editorchoice")
  findEditorsChoice() {
   

    return this.bookService.findEditorsChoice();
  }

  @Get("/find")
  findAll(
    @Query('search') searchQuery?: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    console.log(searchQuery);
    //url: http://localhost:3000/v1/book/find?search=lov&page=1&limit=10
    return this.bookService.findAll(searchQuery, page, limit); ///book?search=Harry Potter&page=2&limit=20
  }
  @Get()
  searchByGenre(@Query('genre') genreName?: string) {
    //url:http://localhost:3000/v1/book?genre=romance
    return this.bookService.searchByGenre(genreName);
  }

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }



  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log(id);

    return this.bookService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(id, updateBookDto);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(id);
  }

}
