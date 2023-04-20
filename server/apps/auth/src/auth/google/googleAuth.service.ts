import { Injectable } from "@nestjs/common";
import { GoogleCodeDto } from "inq-shared-lib";
import { UsersService } from "../../users/users.service";
import { AuthService } from "../auth.service";
import { google, Auth } from 'googleapis';

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
        const { tokens } = await this.oauthClient.getToken(googleCodeDto.code);
        const tokenInfo = await this.oauthClient.getTokenInfo(tokens.access_token);
        const user = await this.userService.getUserByEmail(tokenInfo.email);
        if (user) {
            return this.authService.googleLogin(user);
        }
        return this.authService.googleRegistration(tokenInfo.email);
    }
}
