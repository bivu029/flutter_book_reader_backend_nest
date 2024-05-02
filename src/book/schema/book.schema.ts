import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Bookstatus } from "src/core/enum/bookstatus/bookstatus.enum";

//genre
type GenreDocument = HydratedDocument<Genre>;
//type Document= HydratedDocument<>;
@Schema()
class Genre {

    @Prop({ required: true })
    id: string;

    @Prop({ required: true })
    name: string;

    @Prop()
    description: string;
}

export const GenreSchema = SchemaFactory.createForClass(Genre);


//SubGenre
type SubGenreDocument = HydratedDocument<SubGenre>;
@Schema()
class SubGenre {
    @Prop({ required: true })
    id: string;

    @Prop({ required: true })
    name: string;

    @Prop()
    description: string;
}
export const SubGenreSchema = SchemaFactory.createForClass(SubGenre);

//chapter
type ChapterDocument = HydratedDocument<Chapter>;
@Schema()
class Chapter {
    @Prop({ required: true })
    id: string;
    @Prop({ required: true })
    title: string;
    @Prop({ required: true })
    content: string;

    @Prop({ required: true })
    isFree: boolean;
}
export const ChapterSchema = SchemaFactory.createForClass(Chapter);

//Author
type AuthorDocument = HydratedDocument<Author>;
@Schema()
class Author {
    @Prop({ required: false })
    id?: string;
    @Prop({ required: true })
    authorname: string
}
export const AuthorSchema = SchemaFactory.createForClass(Author);

//cahpterlist

type ChapterListDocument = HydratedDocument<ChapterList>;
@Schema()
class ChapterList {
    @Prop({ required: true })
  
    id: string;
    @Prop()
    bookId:string;
    @Prop({ type: [ChapterSchema], default: [] })
    chapter: Chapter[]

}


export const ChapterListSchema = SchemaFactory.createForClass(ChapterList);

export type BookDocument = HydratedDocument<Book>;
@Schema()
export class Book  {
    @Prop({ required: false,unique:false, })
    id: string;
    @Prop({ required: true })
    title: string;
    @Prop({ required: true })
    description:string
    @Prop({ type: AuthorSchema, isRequired: true })
    author: Author;
    @Prop({ required: false })
    bookCover?: string;
    @Prop({ required: false ,default:false})
    isHot:boolean;
    @Prop({ required: false, default: false })
    editorChoice: boolean;
    @Prop({ type: [GenreSchema], default: [], })
    genres: Genre[];
    @Prop({ type: [SubGenreSchema], default: [], })
    subGenres: SubGenre[];
    @Prop({ type: ChapterListSchema, })
    chapterList: ChapterList;

    @Prop({ required: false, default: 0 })
    count: number;

    @Prop({ required: false, default: null })
    rating: number;
    @Prop({ required: false, default: 0 })
    likeCount: number;
    @Prop({ required: false, default: 0 })
    dislikeCount: number;
    @Prop({ default: [Bookstatus.PENDING] })
    bookstatus:Bookstatus[] 

}

export const BookSchema = SchemaFactory.createForClass(Book);

export const bookSerializer = (doc: BookDocument, retVal: Record<string, any>): void => {
     //retVal.id = retVal._id.toString();
     delete retVal._id;
     delete retVal.__v;
};
export const chapterListSerializer = (doc: ChapterListDocument, retVal: Record<string, any>): void => {
    retVal.id = retVal._id;
    delete retVal._id;

};
export const authorSerializer = (doc: AuthorDocument, retVal: Record<string, any>): void => {
   // retVal.id = retVal._id;
    delete retVal._id;

};
export const chapterSerializer = (doc: ChapterDocument, retVal: Record<string, any>): void => {
   // retVal.id = retVal._id;
    delete retVal._id;

};
export const subGenreSerializer = (doc: SubGenreDocument, retVal: Record<string, any>): void => {
  //  retVal.id = retVal._id;
    delete retVal._id;

};
export const genreSerializer = (doc: GenreDocument, retVal: Record<string, any>): void => {
  //  retVal.id = retVal._id;
    delete retVal._id;

};