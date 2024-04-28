import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GoogleAuthService } from './googleauth.service';


@Injectable()
export class GoogleAuthGuard implements CanActivate {
  constructor(private readonly authService: GoogleAuthService) {}
 canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const googleIdToken = request.body?.idToken;
    console.log(`gitoken:${request.body.idToken}`);
    const requestBody = request.body;
   console.log(requestBody);
   
    
    if (!googleIdToken) {
      throw new UnauthorizedException('Google ID token is missing in the request body');
    }

    return this.validateToken(googleIdToken);
  }
  async validateToken(idToken: string): Promise<boolean> {
    // Replace 'YOUR_CLIENT_ID' with the appropriate client ID for your application
   
    
    // Verify Google ID token
    const isVerified = await this.authService.verifyIdToken(idToken);
    console.log(`verifymethod called and ${isVerified}`);
    
    if (!isVerified) {
      throw new UnauthorizedException('Invalid Google ID token');
    }
    return true;
  }
}
