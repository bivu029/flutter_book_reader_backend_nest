import {Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { MongoUserService } from './database/usermongo.service';
// import { User } from './schema/user.entity';
import { User } from './interface/user.interface';
import { AuthService } from 'src/auth/auth.service';



@Injectable()
export class UserService {
  constructor(private mongoservice: MongoUserService, private authservice:AuthService) { }

  ////create user//// 
  async create(createUserDto: CreateUserDto): Promise<User> {

    const { email } = createUserDto;
    const existingUser = await this.mongoservice.findOneUser(email);
    if (existingUser) {
      const jwtToken = await this.authservice.generateToken({ userId: existingUser._id ,role:existingUser.role});
    const userexist: User = {
        idToken: existingUser._id,

        email: existingUser.email,
        name: existingUser.name,
        photoUrl: existingUser.photoUrl,
        role: existingUser.role,
        subscription: existingUser.subscription,
        bookProgress: existingUser.bookProgress,
        favoriteBooks: existingUser.favoriteBooks,
        readHistory: existingUser.readHistory,
        uplaodedbooks: existingUser.uploadedbooks,
        jwtToken: jwtToken,

      };
      return userexist;
    }
    const user =await  this.mongoservice.creteUser(createUserDto);
    const jwtToken = await this.authservice.generateToken({ userId: user._id,role:user.role });
    const newuser: User = {
      idToken: user.id,

      email: user.email,
      name:user.name,
      photoUrl: user.photoUrl,
      role: user.role,
      subscription: user.subscription,
      bookProgress: user.bookProgress,
      favoriteBooks: user.favoriteBooks,
      readHistory: user.readHistory,
      uplaodedbooks: user.uploadedBooks,
      jwtToken: jwtToken,

    };
    return newuser;
  }

 async findAll() :Promise<any>{
    return  await this.mongoservice.findAllUsers();
  }

 async findOne(id: string) :Promise<any> {
    return await this.mongoservice.findone(id);
  }

 async update(id:string, updateUserDto: UpdateUserDto):Promise<any> {
  console.log(updateUserDto.bookProgress[0]);
  
    return  await this.mongoservice.updateUser(id,updateUserDto);
  }

  // this transfrom method transform return value to following format
  
  async remove(id: string): Promise<object> {
    const deleted = await this.mongoservice.deleteOne(id);
    // if (!deleted) {
    //   throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    // }
    return {"deleted":deleted};
  }

 async isblocUser(id :string, blocstatus: boolean):Promise<object>{

  return await this.mongoservice.isblocUser(id,blocstatus);
  }



}
