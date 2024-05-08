import { Type } from "class-transformer";
import { IsArray, IsString } from "class-validator";


export class GetBookListDto{

    @IsArray()
    @Type(() => String)
    @IsString({each:true})
    bookidList:string[];
    
}