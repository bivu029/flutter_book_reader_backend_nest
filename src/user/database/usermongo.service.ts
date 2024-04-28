import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
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
  try {
    const updatedUser = await this.usermodel
    .findOneAndUpdate({ _id: userId }, { $set: updateUserDto }, { new: true })
    .exec();

  if (!updatedUser) {
    throw new NotFoundException(`User with ID ${userId} not found`);
  }

  return updatedUser;
  } catch (error) {
    if (error.name === 'CastError') {
      throw new HttpException('Invalid user input, please check input data', HttpStatus.BAD_REQUEST);
    } else if (error.name === 'NotFoundException') {
      throw new HttpException('No user Found', HttpStatus.NOT_FOUND);
    } else {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  }


   ///find one by id

   async findone(id:string):Promise<UserDocument>{
    try {
      const user= await this.usermodel.findById(id);
      if (user==null) {
        throw new NotFoundException("no user exist")
      }

 
    return user;
    } catch (error) {
      if (error.name === 'CastError') {
        throw new HttpException('Invalid user input, please check input data', HttpStatus.BAD_REQUEST);
      } else if (error.name === 'NotFoundException') {
        throw new HttpException('No user Found', HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
   }

   //delete user
   async deleteOne(id: string): Promise<boolean> {
  try {
    const deletedUser = await this.usermodel.findByIdAndDelete(id).exec();
    if (!deletedUser) {
      throw new NotFoundException('User not found');
    }
    return !!deletedUser;
  } catch (error) {
    console.log(error.name);
    if (error.name === 'CastError') {
      throw new HttpException('Invalid user input, please check input data', HttpStatus.BAD_REQUEST);
    } else if (error.name === 'NotFoundException') {
      throw new HttpException('No user Found', HttpStatus.NOT_FOUND);
    } else {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  }
  //find all user//
  async findAllUsers(): Promise<UserDocument[]> {
    const users = await this.usermodel.find().exec();
    return users;
  }

  async isblocUser(id :string, blocstatus: boolean):Promise<UserDocument | null>{
    try {
      const updatedUser = await this.usermodel
      .findOneAndUpdate({ _id: id }, {$set: { isbloc:blocstatus }}, )
      .exec();
  
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  
    return updatedUser;
    } catch (error) {
      if (error.name === 'CastError') {
        throw new HttpException('Invalid user input, please check input data', HttpStatus.BAD_REQUEST);
      } else if (error.name === 'NotFoundException') {
        throw new HttpException('No user Found', HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

  }

 
}