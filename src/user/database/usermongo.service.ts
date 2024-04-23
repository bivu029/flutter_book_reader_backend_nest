import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BookConstant } from "src/core/constants/const";
import { BookProgressSchema, FavouriteBooksSchema, ReadHistorySchema, SubscriptionSchema, UploadedBooksSchema, User, UserDocument, bookProgressSerializer, favouriteBooksSerializer, readHistorySerializer, subscriptionSerializer, uploadedBooksSerializer, userSerializer,} from "../schema/user.entity";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";


@Injectable()
export class MongoUserService{

    constructor(@InjectModel(BookConstant.usercollection) private usermodel:Model<User>){
      this.usermodel.schema.set('toObject', { transform: userSerializer });
      this.usermodel.schema.set('toJSON', { transform: userSerializer });

    BookProgressSchema.set('toObject', { transform: bookProgressSerializer });
    BookProgressSchema.set('toJSON', { transform: bookProgressSerializer });

    FavouriteBooksSchema.set('toObject', { transform: favouriteBooksSerializer });
    FavouriteBooksSchema.set('toJSON', { transform: favouriteBooksSerializer });

    ReadHistorySchema.set('toObject', { transform: readHistorySerializer });
    ReadHistorySchema.set('toJSON', { transform: readHistorySerializer });

    SubscriptionSchema.set('toObject', { transform: subscriptionSerializer });
    SubscriptionSchema.set('toJSON', { transform: subscriptionSerializer });

    UploadedBooksSchema.set('toObject', { transform: uploadedBooksSerializer });
    UploadedBooksSchema.set('toJSON', { transform: uploadedBooksSerializer });
    
    };
    

       //find user by email //
   async findOneUser(email:string):Promise<any>{
   
    const result= await this.usermodel.findOne({email}).exec();
   
    return result;
   };  


    //create user //
    async creteUser(MongoCreateUserDto:CreateUserDto):Promise<UserDocument>{
        const data= await this.usermodel.create(MongoCreateUserDto);
        return data;
       }

          //update user//
       
  async updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<UserDocument | null> {
    const updatedUser = await this.usermodel
      .findOneAndUpdate({ _id: userId }, { $set: updateUserDto }, { new: true })
      .exec();

    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return updatedUser;
  }


   ///find one by id

   async findone(id:string):Promise<UserDocument>{
    const user= await this.usermodel.findById(id);
    return user;
   }

   //delete user
   async deleteOne(id: string): Promise<UserDocument> {
    const deletedUser = await this.usermodel.findByIdAndDelete(id).exec();
    return deletedUser;
  }
  //find all user//
  async findAllUsers(): Promise<UserDocument[]> {
    const users = await this.usermodel.find().exec();
    return users;
  }
}