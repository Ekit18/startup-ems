import { Injectable, UnauthorizedException } from '@nestjs/common';

import { google, Auth } from 'googleapis';
import { UsersService } from 'src/users/users.service';
import { AuthService } from '../auth.service';
import { GoogleCodeDto } from '../dto/googleCode.dto';



@Injectable()
export class GoogleAuthService {
    oauthClient: Auth.OAuth2Client;
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UsersService
    ) {
        const clientID = process.env.GOOGLE_AUTH_CLIENT_ID;
        const clientSecret = process.env.GOOGLE_AUTH_CLIENT_SECRET;
        const redirectUri = process.env.GOOGLE_REDIRECT_URI;


        this.oauthClient = new google.auth.OAuth2(
            clientID,
            clientSecret,
            redirectUri
        );
    }

    async authenticate(googleCodeDto: GoogleCodeDto) {
        const codeToToken = googleCodeDto.code;

        const { tokens } = await this.oauthClient.getToken(codeToToken);


        console.log(tokens.access_token);
        const tokenInfo = await this.oauthClient.getTokenInfo(tokens.access_token);
        const user = await this.userService.getUserByEmail(tokenInfo.email);
        if (user) {
            return this.authService.login(user);
        }

        return this.authService.googleRegistration(tokenInfo.email);
        // try {
        //     const user = await this.usersService.getByEmail(email);

        //     return this.handleRegisteredUser(user);
        // } catch (error) {
        //     if (error.status !== 404) {
        //         throw new error;
        //     }

        //     return this.registerUser(token, email);
        // }
    }

    // async exchangeCodeForToken(code: string): Promise<string> {
    //     const { tokens } = await this.oauthClient.getToken(code);
    //     const accessToken = tokens.access_token;
    //     return accessToken;
    //   }
}
