import { Type } from "class-transformer";
import { IsBoolean, IsDefined, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min, ValidateNested } from "class-validator";


export class Genre{

    @IsString()
    @IsDefined()
    @IsNotEmpty()

    id: string;
    
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    name:string;

    @IsOptional()
    @IsString()

    description:string;
}
export class SubGenre{
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsDefined()
    @IsNotEmpty()
    name:string;

    @IsOptional()
    @IsString()

    description:string;

}
export class Chapter{
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    id:string;
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    title:string;
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    content:string;

    @IsBoolean()
    @IsDefined()
    @IsNotEmpty()
    isFree:boolean;
}
export class Author{

    @IsOptional()
    @IsString()
    @IsDefined()
    id?:string;

    @IsString()
    @IsDefined()
    @IsNotEmpty()
    authorname:string

}

export class ChapterList{

    @IsOptional()
    @IsString()
    @IsDefined()
    id:string;

  
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    bookId:string;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(()=>Chapter)
    chapter:Chapter[]=[];
}
export class CreateBookDto {
    @IsOptional()
    @IsString()
    @IsDefined()
    @IsNotEmpty()
id:string;

@IsString()
    @IsDefined()
    @IsNotEmpty()
title:string;

@IsString()
    @IsDefined()
    @IsNotEmpty()
description:string;

@IsNotEmpty()
@ValidateNested({ each: true })
@Type(()=>Author)
author:Author;

@IsOptional()
    @IsString()
bookCover?:string;

@IsOptional()
@ValidateNested({ each: true })
@Type(()=>Genre)
genres:Genre[];

@IsOptional()
@ValidateNested({ each: true })
@Type(()=>SubGenre)
subGenres:SubGenre[];

@IsOptional()
@ValidateNested({ each: true })
@Type(()=>ChapterList)
chapterList:ChapterList;


@IsNumber()
@IsDefined()
count:number ;


@IsNumber()
  @IsDefined()
  @Min(1) // Minimum value of 1
  @Max(5) // Maximum value of 5
rating:number;


@IsNumber()
  @IsDefined()
  @Min(0) // Minimum value of 0

likeCount:number;

@IsNumber()
  @IsDefined()
  @Min(0) // Minimum value of 0
dislikeCount:number;
}
