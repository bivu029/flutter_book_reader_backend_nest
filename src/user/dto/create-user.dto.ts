import { IsEmail, IsNotEmpty, IsString, IsArray, IsDate,  ValidateNested, IsNumber,  } from "class-validator";



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

    @IsString()
    @IsNotEmpty()
    addedAt: string;
}

export class UploadedBooks {
    @IsString()
    @IsNotEmpty()
    bookId: string;

    @IsDate()
    @IsNotEmpty()
    uploadedAt: Date;
}

export class ReadHistory {
    @IsString()
    @IsNotEmpty()
    bookId: string;

    @IsDate()
    @IsNotEmpty()
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

    // @ValidateNested()
    // @IsOptional()
    // subscription?: Subscription;

    @IsArray()
    @ValidateNested({ each: true })
    bookProgress: BookProgress[];

    @IsArray()
    @ValidateNested({ each: true })
    readHistory: ReadHistory[];

    @IsArray()
    @ValidateNested({ each: true })
    favoriteBooks: FavouriteBooks[];

    @IsArray()
    @ValidateNested({ each: true })
    uplaodedbooks: UploadedBooks[];
}