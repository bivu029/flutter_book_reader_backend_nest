import { Role } from "src/core/enum/role/role.enum";


interface Subscription {
    id: string;
    startDate: Date;
    endDate: Date;
    isActive: boolean;
}
interface BookProgress {
    bookId: string;
    currentChapter: number;
    totalChapters: number;
    lastReadTimestamp: Date;
}
interface ReadHistory {
    bookId: string;
    readAt: Date;
}
interface FavouriteBooks {
    bookId: string;
    addedAt: Date;
}

interface UploadedBooks {
    bookId: string;
    uploadedAt: Date;
}
export interface User {
    idToken:string;
    jwtToken:string;
    name?:string;
    email:string;
    photoUrl?:string;
    role: Role[];
   subscription?: Subscription;
   bookProgress: BookProgress[];
   readHistory: ReadHistory[];
   favoriteBooks: FavouriteBooks[];
   uplaodedbooks: UploadedBooks[];
}

