import { Module, forwardRef } from "@nestjs/common";
import { UsersModule } from "../../users/users.module";
import { AuthModule } from "../auth.module";
import { AuthService } from "../auth.service";
import { GoogleAuthController } from "./googleAuth.controller";
import { GoogleAuthService } from "./googleAuth.service";
import { JWTGuardRegisterModule } from "inq-shared-lib";

@Module({
  providers: [GoogleAuthService, AuthService],
  controllers: [GoogleAuthController],
  imports: [
    forwardRef(() => UsersModule),
    AuthModule,
    JWTGuardRegisterModule.register(),
  ],
  exports: [
    GoogleAuthService,
  ],
})
export class GoogleAuthModule { }
