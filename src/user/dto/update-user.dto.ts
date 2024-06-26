import { PartialType } from '@nestjs/mapped-types';
import { BookProgress, CreateUserDto, FavouriteBooks, ReadHistory, UploadedBooks } from './create-user.dto';
import { Exclude } from 'class-transformer';
import { ValidateNested } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    //user is forbidden to update there auth credential due security reason 
    //how ever user can update  progress in app 
    @Exclude()
    idToken: string;
  
    @Exclude()
    name: string;
  
    @Exclude()
    email: string;
    @Exclude()
    photoUrl?: string;
    @ValidateNested({ each: true })
    bookProgress?: BookProgress[];
    readHistory?: ReadHistory[];
    favoriteBooks?: FavouriteBooks[];
    uplaodedbooks?: UploadedBooks[];
}
