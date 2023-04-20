import { Module, forwardRef } from "@nestjs/common";
import { UsersModule } from "../../users/users.module";
import { AuthModule } from "../auth.module";
import { AuthService } from "../auth.service";
import { GoogleAuthController } from "./googleAuth.controller";
import { GoogleAuthService } from "./googleAuth.service";

@Module({
  providers: [GoogleAuthService, AuthService],
  controllers: [GoogleAuthController],
  exports: [
    GoogleAuthService,
  ],
  imports: [
    forwardRef(() => UsersModule),
    AuthModule,
  ],
})
export class GoogleAuthModule { }
