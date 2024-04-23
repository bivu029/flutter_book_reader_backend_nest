import { Transform, Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString,  IsDate, ValidateNested, IsNumber, IsOptional,  } from "class-validator";


// class Subscription {
//     @IsString()
//     @IsNotEmpty()
//     id: string;

//     @IsDate()
//     @IsNotEmpty()
//     startDate: Date;

//     @IsDate()
//     @IsNotEmpty()
//     endDate: Date;

//     @IsBoolean()
//     @IsNotEmpty()
//     isActive: boolean;
// }

export class FavouriteBooks {
    @IsString()
    @IsNotEmpty()
    bookId: string;

    @IsDate()
    @IsNotEmpty()
    @Transform(({ value }) => new Date(value))
    addedAt: Date;
}

export class UploadedBooks {
    @IsString()
    @IsNotEmpty()
    bookId: string;

    @IsDate()
    @IsNotEmpty()
    @Transform(({ value }) => new Date(value))
    uploadedAt: Date;
}

export class ReadHistory {
    @IsString()
    @IsNotEmpty()
    bookId: string;

    @IsDate()
    @IsNotEmpty()
    @Transform(({ value }) => new Date(value))
    readAt: Date;
}

export class BookProgress {
    @IsString()
    @IsNotEmpty()
    bookId: string;

    @IsNumber()
    @IsNotEmpty()
    currentChapter: number;

    @IsNumber()
    @IsNotEmpty()
    totalChapters: number;

    @IsDate()
    @IsNotEmpty()
    @Transform(({ value }) => new Date(value))
    lastReadTimestamp: Date;
}
export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    idToken: string;

    @IsString()
    @IsNotEmpty()
    name?: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    photoUrl?: string;

    @IsOptional()
   
    @ValidateNested({ each: true })
    @Type(()=>BookProgress)
    bookProgress: BookProgress[];

    @IsOptional()
    @Type(()=>ReadHistory)
    @ValidateNested({ each: true })
    readHistory: ReadHistory[];

    @IsOptional()
    @Type(()=>FavouriteBooks)
    @ValidateNested({ each: true })
    favoriteBooks: FavouriteBooks[];

    @IsOptional()
    @Type(()=>UploadedBooks)
    @ValidateNested({ each: true })
    uploadedBooks: UploadedBooks[];
}