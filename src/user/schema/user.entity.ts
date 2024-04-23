
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Role } from "src/core/enum/role/role.enum";

///book progress schema///
type BookProgressDocument = HydratedDocument<BookProgress>;

@Schema()
 class BookProgress {
  @Prop({ required: true })
  bookId: string;

  @Prop({ required: true })
  currentChapter: number;

  @Prop({ required: true })
  totalChapters: number;

  @Prop({ required: true })
  lastReadTimestamp: Date;
}

export const BookProgressSchema = SchemaFactory.createForClass(BookProgress);

//favourte book//
type FavouriteBooksDocument = HydratedDocument<FavouriteBooks>;

@Schema()
 class FavouriteBooks {
  @Prop()
  bookId: string;

  @Prop()
  addedAt: Date;
}

export  const FavouriteBooksSchema = SchemaFactory.createForClass(FavouriteBooks);

 ///reading history//
 type ReadHistoryDocument = HydratedDocument<ReadHistory>;

@Schema()
class ReadHistory {
  @Prop()
  bookId: string;

  @Prop()
  readAt: Date;
}

export  const ReadHistorySchema = SchemaFactory.createForClass(ReadHistory);


//subscriptions schema//
type SubscriptionDocument = HydratedDocument<Subscription>;

@Schema()
 class Subscription {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ required: true, default: false })
  isActive: boolean;
}
export  const SubscriptionSchema = SchemaFactory.createForClass(Subscription);

//uploaded books//

 type UploadedBooksDocument = HydratedDocument<UploadedBooks>;

@Schema()
 class UploadedBooks {
  @Prop()
  bookId: string;

  @Prop()
  uploadedAt: Date;
}

export  const UploadedBooksSchema = SchemaFactory.createForClass(UploadedBooks);

//user schema//
export type UserDocument= HydratedDocument<User>;
@Schema()
export class User {

  @Prop()
  name?: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  photoUrl?: string;

  @Prop({ default: false })
  isbloc: boolean;

  @Prop({ default: [Role.USER] })
  role: Role[];

  @Prop({ type:[SubscriptionSchema],isRequired:false })
  subscription?: Subscription;

  @Prop({ type: [BookProgressSchema],default:[] })
  bookProgress: BookProgress[];

  @Prop({ type: [ReadHistorySchema],default:[] })
  readHistory: ReadHistory[];

  @Prop({ type: [FavouriteBooksSchema],default:[] })
  favoriteBooks: FavouriteBooks[];

  @Prop({ type: [UploadedBooksSchema],default:[] })
  uplaodedbooks: UploadedBooks[];
}

export const UserSchema = SchemaFactory.createForClass(User);


export const bookProgressSerializer = (doc: BookProgressDocument, retVal: Record<string, any>): void => {
  delete retVal._id;
};

export const favouriteBooksSerializer = (doc: FavouriteBooksDocument, retVal: Record<string, any>): void => {
  delete retVal._id;
};

export const readHistorySerializer = (doc: ReadHistoryDocument, retVal: Record<string, any>): void => {
  delete retVal._id;
};

export const subscriptionSerializer = (doc: SubscriptionDocument, retVal: Record<string, any>): void => {
  delete retVal._id;
};

export const uploadedBooksSerializer = (doc: UploadedBooksDocument, retVal: Record<string, any>): void => {
  delete retVal._id;
};
export const userSerializer = (doc: UserDocument, retVal: Record<string, any>): void => {
  retVal.idToken = retVal._id;
  delete retVal._id;
  delete retVal.__v;
};