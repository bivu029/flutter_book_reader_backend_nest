import { HttpException, HttpStatus } from '@nestjs/common';

export class UnsupportedFileTypeException extends HttpException {
  constructor() {
    super('Unsupported file type', HttpStatus.UNSUPPORTED_MEDIA_TYPE);
  }
}
export class FileTooLargeException extends HttpException {
    constructor(maxFileSize: number) {
      super(`File size exceeds the limit of ${maxFileSize} bytes`, HttpStatus.PAYLOAD_TOO_LARGE);
    }
  }
  export class ImageSavedException extends HttpException {
    constructor() {
      super(`image cant save`, HttpStatus.GATEWAY_TIMEOUT);
    }
  }