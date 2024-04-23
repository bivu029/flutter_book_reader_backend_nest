import { PartialType } from '@nestjs/mapped-types';
import { BookProgress, CreateUserDto, FavouriteBooks, ReadHistory, UploadedBooks } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    bookProgress?: BookProgress[];
    readHistory?: ReadHistory[];
    favoriteBooks?: FavouriteBooks[];
    uplaodedbooks?: UploadedBooks[];
}
