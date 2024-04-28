import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";


// Define the allowed file types
const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
const maxfilesize= 100*1024; //100kb
export const multerconfig: MulterOptions = {
  preservePath:true,
 

  // File size limit (100kB)
  limits: {
    fileSize: maxfilesize, // 100kb
  },

  // File filter for allowed file types
  fileFilter: (req, file, cb) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
      // Allow file
      cb(null, true);
    } else {
      // Reject file
      cb(new Error('Unsupported file type'), false);
    }
  },
};
