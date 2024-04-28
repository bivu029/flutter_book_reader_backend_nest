import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { OAuth2Client } from "google-auth-library";


@Injectable()
export class GoogleAuthService{
    private readonly authClient: OAuth2Client;
   
    constructor(private configService: ConfigService) {
        this.authClient = new OAuth2Client(this.configService.get<string>('WEB_TOKEN'));
      }
      async verifyIdToken(idToken: string): Promise<boolean> {
        try {
            const googleAuthToken= this.configService.get<string>('WEB_TOKEN');
          const ticket = await this.authClient.verifyIdToken({
            idToken,
            audience:googleAuthToken, // Your client ID from Google Cloud Console
          });
          const payload = ticket.getPayload();
          console.log(`payload :${payload.email}`);
          
          // Check if the token is issued by Google and for the correct audience
          if (payload && payload.aud ===googleAuthToken) {
            return true;
          }
          return false;
        } catch (error) {
          console.error('Error verifying Google ID token:', error);
          return false;
        }
      }
}